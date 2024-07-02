import express from 'express';
import { connectionDb } from './connection';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes'; 

const app = express();
const PORT = 3000;

connectionDb('mongodb://127.0.0.1:27017/movies');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api', movieRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
