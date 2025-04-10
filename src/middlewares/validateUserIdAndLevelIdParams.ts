import { Request, Response, NextFunction } from 'express';

export const validateUserIdAndLevelIdParams = (req: Request, res: Response, next: NextFunction) => {
    const { userId, levelId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId in route parameters' });
    }

    if (!levelId || isNaN(Number(levelId))) {
        return res.status(400).json({ message: 'Invalid or missing levelId. It must be a number.' });
    }

    next();
};
