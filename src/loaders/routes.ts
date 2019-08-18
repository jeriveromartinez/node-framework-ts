import express from 'express';
import MainController from '../Controllers/MainController';

class Routes {
    router: express.Router;

    constructor () {
        this.router = express.Router();
        this.Load(this.router);
    }

    GetRouter() {
        return this.router;
    }

    Load(router: express.Router) {
        new MainController(router, '');
    }
}

export default Routes;