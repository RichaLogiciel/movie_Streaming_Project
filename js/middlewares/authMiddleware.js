"use strict";
// import { Request, Response, NextFunction } from "express";
// import defaultSecret from '../jwt';
// import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../jwt")); // Assuming this imports your JWT secret
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Please Provide token first" });
        return; // Added return to terminate the function if token is missing
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.default);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.default = authMiddleware;
