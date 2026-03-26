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
    images:{
        type: String
    },
    description:{
        type:String,
        required:true
    },
    
},{timestamps:true, versionKey:false});

const Product = mongoose.model('Product', productSchema);
export default Product;

