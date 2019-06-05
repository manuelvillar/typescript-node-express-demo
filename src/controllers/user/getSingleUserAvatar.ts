/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import user from '../../services/user';
import { logger } from '../../logger';

export default async function getSingleUserAvatar(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> {
    try {
        const avatar = await user.getOneAvatar(req.params.userId);
        res.end(avatar);
    } catch (err) {
        next(err);
    }
}
