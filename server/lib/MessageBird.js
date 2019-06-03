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

        return new Promise(resolve => {
            const ip = (headers['x-forwarded-for'] || connection.remoteAddress).replace('::', '').split(':')[1];
            const code = this.createCode();

            if (!phone) {
                return resolve({
                    message: 'Please Add Phone'
                });
            }

            if (this.phonebook[phone]) {
                return resolve({
                    error: 'Please try again a moment later'
                });
            }

            Object.keys(this.phonebook).forEach(b => {
                if (this.phonebook[b].ip === ip) {
                    return resolve({
                        error: 'Please try again a moment later'
                    });
                }
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

            // return resolve({
            //     message: `Your verofication code is sent${code}`
            // });

            this.messagebird.messages.create(
                {
                    originator: this.originator,
                    recipients: [phone],
                    body: `Hi your verofication code is ${code}`
                },
                (err, response) => {
                    if (err) {
                        console.log(err);
                        return resolve({
                            error: 'Please try again a moment later'
                        });
                    } else {
                        console.log(response);
                        return resolve({
                            message: 'Your verofication code is sent'
                        });
                    }
                }
            );
        });
    }

    verifyCode({ body }) {
        const { code, phone } = body;

        if (!this.phonebook[phone]) {
            return Promise.resolve({
                error: 'This number has not been sent a verification code'
            });
        } else if (this.phonebook[phone].code !== code) {
            return Promise.resolve({
                error: 'Verification code wrong'
            });
        }

        return Promise.resolve({
            message: 'Verify Successfully'
        });
    }
}

module.exports = MessageBird;
