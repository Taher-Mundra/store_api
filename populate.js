import connectDB from "./db/connect.js";
import productsSchema from "./models/product.js";
import dotenv from 'dotenv';
dotenv.config();
import jsonProducts from './products.json' assert { type: 'json'};

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await productsSchema.deleteMany();
        await productsSchema.create(jsonProducts);
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}

start();