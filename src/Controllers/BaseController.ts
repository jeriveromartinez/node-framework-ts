import { Router } from 'express';

class BaseController {
    path: string;
    router: Router;

    constructor (app: Router, path: string) {
        this.router = app;
        this.path = path;

        this.Routes();
    }

    Routes() { }
}

export default BaseController;