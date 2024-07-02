import mongoose, { Document, Schema, Model } from 'mongoose';


interface Movies extends Document {
    title: string;
    description: string;
    director: string;
    cast: string[];
    genre: string;
    releaseDate: Date;
    coverImage: {
        data: Buffer;
        contentType: string;
    };
    availabilityStatus: string;
}

const movieSchema: Schema = new mongoose.Schema({
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

const Movie: Model<Movies> = mongoose.model<Movies>('Movie', movieSchema);

export { Movie, Movies };
