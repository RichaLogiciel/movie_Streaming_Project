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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const multer_1 = __importDefault(require("multer"));
const allMovies_1 = require("../models/allMovies");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, director, cast, genre, releaseDate, availabilityStatus } = req.body;
    try {
        if (!title || !description || !director || !cast || !genre || !releaseDate || !availabilityStatus) {
            console.log("Please provide all");
            return res.status(400).json({ msg: "Please provide all required fields" });
        }
        if (!req.file) {
            return res.status(400).json({ msg: "Please upload a cover image" });
        }
        const existingMovie = yield allMovies_1.Movie.findOne({ title });
        if (existingMovie) {
            return res.status(400).json({ msg: "A movie with this title already exist" });
        }
        const movie = {
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
        const newMovie = new allMovies_1.Movie(movie);
        const savedData = yield newMovie.save();
        return res.status(201).json({ msg: "Movie Created Successfully" });
    }
    catch (error) {
        return res.status(400).json({ msg: `Error creating movie: ${error.message}` });
    }
});
exports.createMovie = createMovie;
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 4;
        const allMovies = yield allMovies_1.Movie.find().select('title').limit(limit);
        return res.status(200).json(allMovies);
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const fetchMovieById = yield allMovies_1.Movie.findById(id).select('-coverImage');
        if (!fetchMovieById) {
            return res.status(404).json({ msg: "Movie not Found" });
        }
        return res.status(200).json(fetchMovieById);
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getMovieById = getMovieById;
const searchMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, director } = req.query;
    if (!title && !director) {
        return res.status(400).json({ msg: "Please Provide a tile or director" });
    }
    const query = {};
    if (title)
        query.title = { $regex: new RegExp(title, 'i') };
    if (director)
        query.director = { $regex: new RegExp(director, 'i') };
    const movies = yield allMovies_1.Movie.find(query).select('-coverImage');
    ;
    if (movies.length === 0) {
        return res.status(404).json({ msg: "not Found" });
    }
    return res.status(200).json(movies);
});
exports.searchMovie = searchMovie;
