import mongoose,{ Document,Schema,Model } from "mongoose"; 
import bcrypt from 'bcrypt';

interface User extends Document {
    userName: String;
    email: String;
    password: String;
    favouriteGenre: String[]; 
    unFavouriteGenre?: String[];
    comparePassword(candidatePassword: String): Promise<boolean>;
} 
const userSchema : Schema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favouriteGenre: { type: String, required: true },
    unFavouriteGenre: { type: String, required: true}
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}
const userModel:Model<User> = mongoose.model<User>('User',userSchema);

export {userModel,User};