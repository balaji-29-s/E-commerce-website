import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type: String
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
    
},{timestamps:true, versionKey:false});

const Product = mongoose.model('Product', productSchema);
export default Product;

