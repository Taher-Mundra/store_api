import mongoose from 'mongoose'

const productsModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"]
    },
    price: {
        type: Number,
        required: [true, "price must be provided"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ["ikea","marcos","caressa","liddy"],
            message: '{VALUE} is not supported'
        }
    }
})

const productsSchema = mongoose.model('Product',productsModel)

export default productsSchema;