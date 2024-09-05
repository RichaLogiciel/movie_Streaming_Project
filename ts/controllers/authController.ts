import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import defaultSecret from '../jwt';
import {userModel,User} from '../models/user';

export const registerUser = async(req: Request, res: Response): Promise<Response> => {
    try {
    const { userName ,email, password, favouriteGenre, unFavouriteGenre} = req.body;
    if(!userName || !email || !password || !favouriteGenre) {
        console.log("Validation Error: Please Provide required fields");
        return res.status(400).json({ msg: "Please Provide important credentials"});
    }
    const existingUser = await userModel.findOne({email: email});
    if(existingUser) {
        console.error("User already exists");
        return res.status(400).json({ msg: "User already exists"});
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const newUser:Partial<User> = {
        userName,
        email,
        password: hashedPassword,
        favouriteGenre,
        unFavouriteGenre
    }
    await userModel.create(newUser);
    return res.status(201).json({ msg: "User Created Successfullyy",});
    } catch(error) {
        console.log("Internal Server Error");
        return res.status(500).json({ msg: "Internal server Error"});
    }
}

export const login = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { email,password } = req.body;
        if(!email || !password) {
            console.log('Please provide important credentials');
            return res.status(400).json({ msg: "Please provide imp credentials"});
        }
        const user:User | null = await userModel.findOne({ email }); 
        if(!user || !(await bcrypt.compare(password, user.password.toString()))) {
            console.log("Provided creadentials are Invalid");
            return res.status(401).json({ msg: "Invalid credentials"});
        }
        const token = jwt.sign({ userId: user._id }, defaultSecret, { expiresIn: '1h'});
        return res.json({ msg: "logged In Successfully", token });
    } catch(error) {
        console.log('Internal Server Error');
        return res.status(500).json({ msg: "Internal Server error"});
    }
}

export const favouriteGenre = async(req:Request,res:Response) =>  {
   try {
        const id = req.params.id;
        const favMovie = await userModel.findById(id).select('favouriteGenre');
        if(!favMovie) {
            console.log('Favourite movie not found');
            return res.status(404).json({ msg:"FavMovie not Found" });
        }
        return res.status(200).json(favMovie);
    } catch(error) {
        console.log('Internal Server Error');
        return res.status(500).json({ msg: "Internal Server Error",error })
    }
}

export const unfavouriteGenre = async(req:Request,res:Response): Promise<Response> =>  {
    try {
        const id = req.params.id;
        const unfavMovie = await userModel.findById(id).select('unFavouriteGenre');
        if(!unfavMovie) {
           console.log('UnfavouriteMovie not found');
           return res.status(404).json({ msg:"Movie not Found" });
        }
        return res.status(200).json(unfavMovie);
    } catch(error) {
        return res.status(500).json({ msg: "Internal Server Error",error })
    }
}

export const updateUser = async(req: Request,res: Response) => {
    const userId = req.params.userId;
    const { userName ,email, password, favouriteGenre, unFavouriteGenre} = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            userName,
            email,
            password,
            favouriteGenre,
            unFavouriteGenre
        }, { new: true });

        if(!updatedUser) {
            console.log('User not found');
            return res.status(404).json({ error: "User not found"});
        }
       return res.status(200).json(updatedUser);
    } catch(error) {
        console.log('Internal Server Error');
        res.status(500).json({ error: "Internal Server Error"});
    }
}
