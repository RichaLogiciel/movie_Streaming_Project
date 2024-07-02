"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 'Internal Server Error');
};
