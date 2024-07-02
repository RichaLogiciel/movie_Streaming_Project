"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    coverImage: {
        data: Buffer,
        contentType: String
    },
    availabilityStatus: { type: String, required: true }
});
const Movie = mongoose_1.default.model('Movie', movieSchema);
exports.Movie = Movie;
