import productsSchema from "../models/product.js"

const getAllProducts = async (req,res) => { 

    const products = await productsSchema.find(req.query);
    res.status(200).json({products: products})
}

const getAllProductsStatic = async (req,res) => { 
    const products = await productsSchema.find({})
    res.status(200).json({products: products}) }

export {getAllProducts,getAllProductsStatic}