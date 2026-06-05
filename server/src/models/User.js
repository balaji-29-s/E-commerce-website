import mongoose from 'mongoose';
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['BUYER','SELLER']
    }
},{timestamps:true,versionkey:false});
const User=mongoose.model('User',userSchema);
export default User;
