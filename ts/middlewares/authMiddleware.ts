import { Request, Response, NextFunction } from "express";
import defaultSecret from '../jwt'; 
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
         res.status(401).json({ error: "Please Provide token first" });
         console.log("Please Provide token");
         return; 
    }

    try {
        const decoded = jwt.verify(token, defaultSecret) as any;
        req.user = decoded;
        next();
    } catch (error) {
        console.log('11');
        console.log("Internal Server Error");
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default authMiddleware;
