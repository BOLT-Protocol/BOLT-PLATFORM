const fs = require('fs');
const path = require('path');
const toml = require('toml');

class Utils {
    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, file) => {
                if (err) {
                    reject('Read File Error');
                } else {
                    resolve(file);
                }
            });
        });
    }

    static readToml(config) {
        return new Promise((resolve, reject) => {
            try {
                const result = toml.parse(config);
                resolve(result);
            } catch (e) {
                console.log('Read Toml Fail');
                reject(e);
            }
        });
    }

    static initialBots({ folder, config }) {
        const proto = 'Bot.js';
        const interfaceBot = path.resolve(__dirname, proto);

        return new Promise((resolve, reject) => {
            fs.readdir(folder, (err, files) => {
                if (err) return reject(err);

                Promise.all(
                    files
                        .map(file => path.resolve(folder, file))
                        .filter(file => path.parse(file).name !== path.parse(interfaceBot).name)
                        .map(file => require(file))
                        .filter(cls => cls.isBot)
                        .map(Cls => {
                            return new Cls();
                        })
                        .map(bot => bot.init({ config }))
                ).then(bots => resolve(bots));
            });
        });
    }

    static starBots({ Bots, nextApp }) {
        return Promise.all(Bots.map(bot => bot.start(nextApp))).then(() => Bots);
    }

    static getPackageInfo() {
        return this.readFile(path.resolve(__dirname, '../../package.json')).then(file => {
            const jf = JSON.parse(file);
            return Promise.resolve({
                // name: rf.name,
                version: jf.version
            });
        });
    }
}

module.exports = Utils;
