import express from 'express';
import * as user from './user';

export const register = (router: express.Router): void => {
    router.get(
        '/',
        (req: express.Request, res: express.Response): void => {
            res.send('API v1');
        },
    );

    user.register(router);
};
