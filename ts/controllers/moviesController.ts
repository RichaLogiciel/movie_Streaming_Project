import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import { Movie, Movies } from '../models/allMovies';
import { compareSync } from 'bcrypt';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const storage = multer.memoryStorage();
// const upload = multer({ storage });

export const createMovie = async (req: MulterRequest, res: Response): Promise<Response> => {
    const { title, description, director, cast, genre, releaseDate, availabilityStatus } = req.body;
    try { 
    if (!req.file) {
        console.log('please upload a cover file');
        return res.status(400).json({ msg: "Please upload a cover image" });
    }
        const existingMovie = await Movie.findOne({ title });
        if(existingMovie) {
            console.log('Movie already exists in database');
            return res.status(400).json({ msg: "A movie with this title already exist" });
        }
        const movie: Partial<Movies> = {
            title,
            description,
            director,
            cast,
            genre,
            releaseDate: new Date(releaseDate),
            coverImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            availabilityStatus
        };

        const newMovie = new Movie(movie);
        const savedData = await newMovie.save();

        return res.status(201).json({ msg: "Movie Created Successfully" });
    } catch (error: any) {
        console.log('Internal Server Error');
        return res.status(400).json({ msg: `Error creating movie: ${error.message}` });
    }
};

export const getAllMovies = async (req:Request ,res: Response): Promise<Response> => {
    try {
        const limit = parseInt(req.query.limit as string) || 4;
        const allMovies = await Movie.find().select('title').limit(limit);
        return res.status(200).json(allMovies);
    } catch (error: any) {
        console.error('Error fetching movies:', error); 
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const getMovieById = async(req: Request, res: Response):Promise<Response> => {
    try {
        const id = req.params.id;
        const fetchMovieById = await Movie.findById(id).select('-coverImage');
        if(!fetchMovieById) {
            console.log('Movie not found');
            return res.status(404).json({ msg:"Movie not Found" });
        }
        return res.status(200).json(fetchMovieById);
    } catch(error:any) {
        console.log('Internal Server Error');
        return res.status(500).json({ msg: "Internal Server Error"});
    }
}

export const searchMovie = async(req: Request, res: Response): Promise<Response> => {
    const { title, director } = req.query;
    if(!title && !director) {
        console.log('Please provide title or genre');
        return res.status(400).json({ msg: "Please Provide a tile or director"})
    }
    const query:any = {};
    if(title) query.title = { $regex: new RegExp(title as string, 'i') };
    if(director) query.director = { $regex:  new RegExp(director as string, 'i')};

    const movies = await Movie.find(query).select('-coverImage');;

    if(movies.length === 0) {
        console.log('Movie not found');
        return res.status(404).json({ msg: "Movie not found"});
    }
    return res.status(200).json(movies);
}


