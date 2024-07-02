import { Router } from 'express';
import { createMovie, getAllMovies, getMovieById, searchMovie,} from '../controllers/moviesController';
import { registerUser, favouriteGenre, unfavouriteGenre, login, updateUser} from '../controllers/authController';
import { UserReviews, getReviews , deleteReview, updateReview} from '../controllers/reviewController'
import authMiddleware from '../middlewares/authMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// MoviesController
router.post('/createMovie', upload.single('coverImage'), createMovie);

//Public endPoints
router.get('/getAllMovies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.get('/searchMovie', searchMovie);    

// authController
router.post('/user/registration',registerUser);
router.post('/user/profile', login);
router.post('/user/:userId',authMiddleware, updateUser);
router.get('/movies/:id/favourite',authMiddleware,favouriteGenre);
router.get('/movies/:id/unfavourite',authMiddleware,unfavouriteGenre);

//review controller
router.post('/reviews', authMiddleware,UserReviews);
router.get('/reviews/:userId',authMiddleware, getReviews);
router.post('/reviews/:userId/:reviewId/delete',authMiddleware, deleteReview)
router.post('/reviews/:userId/:reviewId/update',authMiddleware, updateReview);

export default router;
