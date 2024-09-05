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
exports.updateUser = exports.unfavouriteGenre = exports.favouriteGenre = exports.login = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../jwt"));
const user_1 = require("../models/user");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, favouriteGenre, unFavouriteGenre } = req.body;
        if (!userName || !email || !password || !favouriteGenre) {
            console.log("Validation Error: Please Provide required fields");
            return res.status(400).json({ msg: "Please Provide important credentials" });
        }
        const existingUser = yield user_1.userModel.findOne({ email: email });
        if (existingUser) {
            console.error("User already exists");
            return res.status(400).json({ msg: "User already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = {
            userName,
            email,
            password: hashedPassword,
            favouriteGenre,
            unFavouriteGenre
        };
        yield user_1.userModel.create(newUser);
        return res.status(201).json({ msg: "User Created Successfully", });
    }
    catch (error) {
        console.log("Internal Server Error");
        return res.status(500).json({ msg: "Internal server Error" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Please provide important credentials');
            return res.status(400).json({ msg: "Please provide imp credentials" });
        }
        const user = yield user_1.userModel.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password.toString()))) {
            console.log("Provided creadentials are Invalid");
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwt_1.default, { expiresIn: '1h' });
        return res.json({ msg: "logged In Successfully", token });
    }
    catch (error) {
        console.log('Internal Server Error');
        return res.status(500).json({ msg: "Internal Server error" });
    }
});
exports.login = login;
const favouriteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const favMovie = yield user_1.userModel.findById(id).select('favouriteGenre');
        if (!favMovie) {
            console.log('Favourite movie not found');
            return res.status(404).json({ msg: "FavMovie not Found" });
        }
        return res.status(200).json(favMovie);
    }
    catch (error) {
        console.log('Internal Server Error');
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
});
exports.favouriteGenre = favouriteGenre;
const unfavouriteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const unfavMovie = yield user_1.userModel.findById(id).select('unFavouriteGenre');
        if (!unfavMovie) {
            console.log('UnfavouriteMovie not found');
            return res.status(404).json({ msg: "Movie not Found" });
        }
        return res.status(200).json(unfavMovie);
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
});
exports.unfavouriteGenre = unfavouriteGenre;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { userName, email, password, favouriteGenre, unFavouriteGenre } = req.body;
    try {
        const updatedUser = yield user_1.userModel.findByIdAndUpdate(userId, {
            userName,
            email,
            password,
            favouriteGenre,
            unFavouriteGenre
        }, { new: true });
        if (!updatedUser) {
            console.log('User not found');
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log('Internal Server Error');
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
