"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./connection");
const body_parser_1 = __importDefault(require("body-parser"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, connection_1.connectionDb)('mongodb://127.0.0.1:27017/movies');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api', movieRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
