import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './loaders/routes';
import DB from './Libraries/db';
import config from './config.json';

global.config = process.env.NODE_ENV ? config[process.env.NODE_ENV] : config.production;
const port: number = process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3030;
const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

new DB().Initialize().then(() => {
    const router = new Routes();
    app.use('/', router.GetRouter());
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});