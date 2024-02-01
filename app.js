import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFound from './middleware/not-found.js'
import connectDB from './db/connect.js';
import router from './routes/products.js';
import 'express-async-errors';
dotenv.config();

const app = express();

app.use(express.json())

app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/products">Product page</a>')
})

app.use('/api/v1/products',router);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        //connectDb
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server started listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();