import express from 'express';
import { logger } from '../logger';

function errorHandler(
    err: express.Errback,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void {
    res.status(500);
    logger.error(err.name);
    next();
}

export const register = (router: express.Router): void => {
    router.use(errorHandler);
};
