const Bot = require('./Bot');

class MessageBird extends Bot {
    constructor() {
        super();

        this.note = {
            expireDate: 0,
            code: '',
            ip: ''
        };
    }

    init({ config }) {
        this.messagebird = require('messagebird')(config.messagebird.apiKey);
        this.phonebook = {};
        this.originator = config.messagebird.originator;
        console.log(this.originator);
        this.expire = (config.messagebird.expireSecond || 30) * 1000;
        return super.init({ config }).then(() => this);
    }

    start() {
        return Promise.resolve(this);
    }

    createCode() {
        return Array(6)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10))
            .join('');
    }

    setPhoneBook({ body, headers, connection }) {
        const { phone } = body;

        return new Promise((resolve, reject) => {
            const ip = (headers['x-forwarded-for'] || connection.remoteAddress).replace('::', '').split(':')[1];
            const code = this.createCode();

            if (!phone) {
                return resolve({
                    message: 'Please Add Phone'
                });
            }

            if (this.phonebook[phone]) {
                return Promise.resolve({
                    message: 'Please try again a moment later'
                });
            }

            Object.keys(this.phonebook).forEach(b => {
                b.ip = ip;

                return resolve({
                    message: 'Please try again a moment later'
                });
            });

            this.phonebook[phone] = {
                ...this.note,
                expireDate: Date.now() + this.expire,
                code,
                ip
            };

            setTimeout(() => {
                delete this.phonebook[phone];
            }, this.expire);

            this.messagebird.messages.create(
                {
                    originator: this.originator,
                    recipients: [this.originator],
                    body: `Hi your verify code is ${code}`
                },
                (err, response) => {
                    if (err) {
                        console.log(err);
                        return resolve({
                            message: 'Please try again a moment later'
                        });
                    } else {
                        console.log(response);
                        return resolve({
                            ip,
                            code
                        });
                    }
                }
            );
        });
    }

    verifyCode({ body }) {
        console.log(this.phonebook);

        const { code, phone } = body;

        if (this.phonebook[phone] && this.phonebook[phone].code === code) {
            return Promise.resolve({
                message: true
            });
        }

        return Promise.resolve('Verify Error');
    }
}

module.exports = MessageBird;
