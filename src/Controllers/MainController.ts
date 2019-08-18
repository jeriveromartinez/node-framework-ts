import { Request, Response } from 'express';
import BaseController from './BaseController';
import UserRepository from "./../Repositories/UserRepository";

class MainController extends BaseController {
    userManager: UserRepository;

    constructor (app, path) {
        super(app, path);
        this.userManager = new UserRepository();
    }

    Routes() {
        this.router.get(`${this.path}`, this.Index);
        this.router.post(`${this.path}/create`, this.Create.bind(this));
    }

    Index(request: Request, response: Response) {
        response.json({ msg: 'OK' });
    }

    async Create(request: Request, response: Response) {
        const { email, password } = request.body;
        await this.userManager.Create({ email, password });
        response.json({ msg: 'OK' });
    }
}

export default MainController;