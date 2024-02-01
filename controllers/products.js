import productsSchema from "../models/product.js"

const getAllProducts = async (req,res) => { 
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'};
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq'
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        const options = ['price','rating']
        let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`)
        filters.split(',').forEach(element => {
            const [field,operator,value] = element.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value) };
            }
        });
    }
    console.log(queryObject);
    let results = productsSchema.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ');
        results = results.sort(sortList)
    }
    else{
        results = results.sort('createdAt');
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        results = results.select(fieldsList);
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page-1)*limit;
    results = results.limit(limit).skip(skip);


    const products = await results;
    res.status(200).json({products: products,nHits: products.length})
}

const getAllProductsStatic = async (req,res) => { 
    const products = await productsSchema.find({})
    res.status(200).json({products: products,nHits: products.length}) }

export {getAllProducts,getAllProductsStatic}