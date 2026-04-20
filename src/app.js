import express from 'express';
import userRouter from './routers/user.router.js';
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;



