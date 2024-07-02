import { reviewModel } from '../models/reviews';
import { Request, Response } from 'express';

export const UserReviews = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId,movieId, postReview, ratings } = req.body;

        if (!userId || !postReview  || !ratings ||!movieId) {
            console.log("All fields are not provided");
            return res.status(401).json({ msg: "Please provide all required fields" });
        }
        const newReview = new reviewModel({
            userId,
            movieId,
            postReview,
            ratings
        });
        const savedReview = await newReview.save();
        return res.status(201).json({ msg: "Review Created Successfully" });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getReviews = async(req: Request, res: Response): Promise<Response> => {
   try{
    const userId = req.params.userId;
    const userReviews = await reviewModel.find({userId});
    if(!userReviews || userReviews.length === 0) {
        console.log("User not found");
        return res.status(404).json({ error: "User Not Found"})
    }
    return res.status(201).json(userReviews);
    } catch( error ) {
        console.log("Internal Server Error");
        return res.status(500).json({ error: "Internal Server Error"})
    }
}

export const deleteReview = async(req: Request, res: Response): Promise<Response> => {
    try{
        const {userId,reviewId} = req.params;
        const deleteReview = await reviewModel.findOneAndDelete({userId,_id:reviewId});
        if(!deleteReview) {
            console.log('Review not found');
            return res.status(404).json({ error: "Review not found"})
        }
        return res.status(200).json({ msg: "Review Deleted Successfully"});
    } catch(error) {
        console.log("Internal Server Error");
        return res.status(500).json({ error: "Internal Server Error"});
    }
}

export const updateReview = async(req: Request, res: Response): Promise<Response> => {
    const { userId,reviewId } = req.params;
    const { postReview,ratings } = req.body;
    try {
        const updatReviewByUser = await reviewModel.updateOne({userId,_id:reviewId}, {
            postReview,
            ratings
        });
        if(!updatReviewByUser) {
            console.log('User not found');
            return res.status(400).json({ msg: "User Not found"});
        }
        return res.status(200).json({ msg: "Review Updated Successfully" });
    } catch(error) {
        console.log("Internal Server Error");
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}















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
