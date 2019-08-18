import chalk from 'chalk';
import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import Loader from '../loaders/model';

const log = console.log;

class Db {
    mongoUrl: string;

    constructor () {
        this.mongoUrl = global.config.mongoUrl;
    }

    Initialize() {
        let reboots = 0;

        return new Promise((resolve, reject) => {
            const mongooseDb = mongoose.connection;
            mongoose.Promise = Bluebird;

            mongooseDb.on('error', (error) => {
                mongoose.disconnect();
                reject(error);
            });

            mongooseDb.on('connected', () => {
                log(chalk.green.bgBlack('MongoDB Connected'));
                global.db = new Loader(mongoose).Load();
                resolve(true);
            });

            mongooseDb.on('reconnected', () => {
                global.db = new Loader(mongoose).Load();
                resolve(true);
            });

            mongooseDb.on('disconnected', () => {
                if (global.config.dbLoadIntent >= reboots) {
                    reboots++;
                    mongoose.connect(this.mongoUrl, this.options());
                } else reject('Limit of conections intent.');
            });

            mongoose.connect(this.mongoUrl, this.options());
        });
    }

    options() {
        return { useNewUrlParser: true, useCreateIndex: true };
    }
}

export default Db;
