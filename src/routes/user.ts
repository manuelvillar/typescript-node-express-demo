import express from 'express';
import getSingleUser from '../controllers/user/getSingleUser';
import getSingleUserAvatar from '../controllers/user/getSingleUserAvatar';
import deleteSingleUserAvatar from '../controllers/user/deleteSingleUserAvatar';


/* eslint-disable */
const handlerException = (fn: express.RequestHandler) => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    fn(req, res, next).catch(
        (error: Error): void => {
            next(error);
        },
    );
};

/* eslint-enable */

export const register = (router: express.Router): void => {
    router.get('/user/:userId/avatar', handlerException(getSingleUserAvatar));
    router.delete('/user/:userId/avatar', handlerException(deleteSingleUserAvatar));
    router.get('/user/:userId', handlerException(getSingleUser));
};
