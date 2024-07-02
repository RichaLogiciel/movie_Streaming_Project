import mongoose from "mongoose";

export const connectionDb = async(url: string) => {
    try{
        await mongoose.connect(url);
        console.log('MongoDb connected');
    } catch(error) {
        console.log("Can't connect to mongoDB");
    }
}

