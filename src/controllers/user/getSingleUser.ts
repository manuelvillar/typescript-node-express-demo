import express from 'express';
import user from '../../services/user';

export default async function getSingleUser(
    req: express.Request,
    res: express.Response,
    // next: express.NextFunction,
): Promise<void> {
    const userData = await user.getOne(req.params.userId);
    res.json(userData);
}
