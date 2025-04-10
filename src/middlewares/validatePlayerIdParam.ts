import { Request, Response, NextFunction } from 'express';

export const validatePlayerIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'Missing playerId in route parameters' });
    }

    next();
};
