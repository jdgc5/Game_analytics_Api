import { Request, Response, NextFunction } from 'express';

export const validateBodyFields = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missing = fields.filter(field => req.body[field] === undefined);

        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(', ')}`
            });
        }
        next();
    };
};
