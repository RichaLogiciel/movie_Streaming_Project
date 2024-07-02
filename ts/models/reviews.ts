import mongoose,{Document,Schema,Model} from "mongoose";

interface reviews extends Document {
    userId: mongoose.Types.ObjectId;
    movieId: mongoose.Types.ObjectId;
    postReview: String;
    Ratings: Number;
} 

const reviewSchema:Schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    movieId:{ type: mongoose.Types.ObjectId, required: true},   
    postReview: { type: String, required: true},
    ratings: { type: Number, required: true }
})

const reviewModel: Model<reviews> = mongoose.model<reviews>('reviews',reviewSchema);
export { reviewModel, reviewSchema };