import mongoose from 'mongoose';

const reviewSchema=mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    review:{
        type:String,
        trim:true
    }
},{timestamps:true, versionKey:false});

const Review=mongoose.model('Review', reviewSchema);
export default Review;