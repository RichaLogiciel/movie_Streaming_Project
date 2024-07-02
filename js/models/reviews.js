"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.reviewModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, required: true },
    movieId: { type: mongoose_1.default.Types.ObjectId, required: true },
    postReview: { type: String, required: true },
    ratings: { type: Number, required: true }
});
exports.reviewSchema = reviewSchema;
const reviewModel = mongoose_1.default.model('reviews', reviewSchema);
exports.reviewModel = reviewModel;
