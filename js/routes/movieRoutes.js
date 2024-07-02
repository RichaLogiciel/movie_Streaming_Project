"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moviesController_1 = require("../controllers/moviesController");
const authController_1 = require("../controllers/authController");
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// MoviesController
router.post('/createMovie', upload.single('coverImage'), moviesController_1.createMovie);
//Public endPoints
router.get('/getAllMovies', moviesController_1.getAllMovies);
router.get('/movies/:id', moviesController_1.getMovieById);
router.get('/searchMovie', moviesController_1.searchMovie);
// authController
router.post('/user/registration', authController_1.registerUser);
router.post('/user/profile', authController_1.login);
router.post('/user/:userId', authMiddleware_1.default, authController_1.updateUser);
router.get('/movies/:id/favourite', authMiddleware_1.default, authController_1.favouriteGenre);
router.get('/movies/:id/unfavourite', authMiddleware_1.default, authController_1.unfavouriteGenre);
//review controller
router.post('/reviews', authMiddleware_1.default, reviewController_1.UserReviews);
router.get('/reviews/:userId', authMiddleware_1.default, reviewController_1.getReviews);
router.post('/reviews/:userId/:reviewId/delete', authMiddleware_1.default, reviewController_1.deleteReview);
router.post('/reviews/:userId/:reviewId/update', authMiddleware_1.default, reviewController_1.updateReview);
exports.default = router;
