/* eslint-ignore @typescript-eslint/no-explicit-any */
import express from 'express';
import user from '../../services/user';

export default async function deleteSingleUserAvatar(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> {
    try {
        const status = await user.deleteOneAvatar(req.params.userId);
        res.status(status).send();
    } catch (e) {
        next(e);
    }
}
