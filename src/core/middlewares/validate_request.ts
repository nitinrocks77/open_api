import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateRequest<T extends object>(dtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => { // ✅ Ensure return type is Promise<void>
        const instance = plainToInstance(dtoClass, req.body);
        const errors = await validate(instance);

        if (errors.length > 0) {
            res.status(400).json({
                message: "Validation failed",
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }))
            });
            return; // ✅ Prevents calling next() after sending a response
        }

        next(); // ✅ Ensures middleware passes control to the next function
    };
};
