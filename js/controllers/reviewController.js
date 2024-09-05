"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReview = exports.deleteReview = exports.getReviews = exports.UserReviews = void 0;
const reviews_1 = require("../models/reviews");
const UserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, movieId, postReview, ratings } = req.body;
        if (!userId || !postReview || !ratings || !movieId) {
            console.log("All fields are not provided");
            return res.status(401).json({ msg: "Please provide all required fields" });
        }
        const newReview = new reviews_1.reviewModel({
            userId,
            movieId,
            postReview,
            ratings
        });
        const savedReview = yield newReview.save();
        return res.status(201).json({ msg: "Review Created Successfully" });
    }
    catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.UserReviews = UserReviews;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userReviews = yield reviews_1.reviewModel.find({ userId });
        if (!userReviews || userReviews.length === 0) {
            console.log("User not found");
            return res.status(404).json({ error: "User Not Found" });
        }
        return res.status(201).json(userReviews);
    }
    catch (error) {
        console.log("Internal Server Error");
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getReviews = getReviews;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, reviewId } = req.params;
        const deleteReview = yield reviews_1.reviewModel.findOneAndDelete({ userId, _id: reviewId });
        if (!deleteReview) {
            console.log('Review not found');
            return res.status(404).json({ error: "Review not found" });
        }
        return res.status(200).json({ msg: "Review Deleted Successfully" });
    }
    catch (error) {
        console.log("Internal Server Error");
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, reviewId } = req.params;
    const { postReview, ratings } = req.body;
    try {
        const updatReviewByUser = yield reviews_1.reviewModel.updateOne({ userId, _id: reviewId }, {
            postReview,
            ratings
        });
        if (!updatReviewByUser) {
            console.log('User not found');
            return res.status(400).json({ msg: "User Not found" });
        }
        return res.status(200).json({ msg: "Review Updated Successfully" });
    }
    catch (error) {
        console.log("Internal Server Error");
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.updateReview = updateReview;
// export const updateReview = async(req: Request, res: Response): Promise<Response> => {
//     try{
//         const {userId, reviewId } = req.params;
//         const { postReview, ratings} =  req.body;
//         const updateReview = await reviewModel.({ userId} , {
//             postReview,
//             ratings
//         },{ new: true });
//         if(!updateReview) {
//             return res.status(404).json({ error: "User not found"})
//         }
//         return res.status(200).json({ msg: "review Updated successfully"});
//     } catch(error) {
//         return res.status(500).json({ msg: "Internal Server Error"});
//     }
// }
