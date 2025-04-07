import { Request, Response, NextFunction } from 'express';

export const validatePlayerIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { playerId } = req.params;

    if (!playerId) {
        return res.status(400).json({ message: 'Missing playerId in route parameters' });
    }

    next();
};
