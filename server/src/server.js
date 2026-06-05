import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { AuthenticationError, BadRequestError, NotFoundError } from './core/ApiError.js';
import { isLoggedIn } from './middleware/auth.js';
import Product from './models/Products.js';
import Review from './models/Review.js'; // Ensure this model exists and is imported
import User from './models/User.js';
const JWT_SECRET="FD86118B3687B5773B193B215274F";

const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE']
}));


/* -------------------- MongoDB Connection -------------------- */
mongoose.connect('mongodb://127.0.0.1:27017/bazaar-db')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('❌ MongoDB Error:', err));

/* -------------------- Async Wrapper -------------------- */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/* -------------------- Routes -------------------- */

// Root route
app.get('/', (req, res) => {
    res.send('🚀 API is running');
});

/* ---------- GET all products ---------- */
app.get('/products', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

/* ---------- CREATE product ---------- */
app.post('/products', asyncHandler(async (req, res) => {
    const { title, description, image, price } = req.body;

    if (!title || !price) {
        throw new BadRequestError('Title and price are required');
    }

    const product = await Product.create({
        title,
        description,
        image,
        price
    });

    res.status(201).json(product);
}));
/* ---------- GET single product ---------- */
app.get('/products/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate('reviews');

    if (!product) {
        throw new NotFoundError('Product not found');
    }

    res.json(product);
}));

/* ---------- UPDATE product ---------- */
app.patch('/products/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { title, description, price, image } = req.body;

    const product = await Product.findByIdAndUpdate(
        productId,
        { title, description, price, image },
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new NotFoundError('Product not found');
    }

    res.json(product);
}));

/* ---------- DELETE product ---------- */
app.delete('/products/:productId', asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        throw new NotFoundError('Product not found');
    }

    res.json({ message: 'Product deleted successfully' });
}));
/* -------------------- Review Routes -------------------- */
app.post('/products/:productId/reviews', asyncHandler(async (req, res) => {
    const {productId}=req.params;
    const{rating,review}=req.body;
    const product=await Product.findById(productId);
    if(!product){
        throw new NotFoundError('Product not found');
    }
    const newReview=await Review.create({
        rating,
        review})
    product.reviews.push(newReview._id);
    await product.save();
    res.json({message:'Review added successfully'});
}));
/* -------------------- Authentication Routes -------------------- */
//register route
app.post('/register',async(req,res)=>{
    const{username,email,password,role}=req.body;
    const user=await User.findOne({username});
    if(user){
        throw new BadRequestError('Username already exists');
    }
    const hash=await bcrypt.hash(password,12);
    const newUser=await User.create({
        username,
        email,
        password:hash,
        role
    });
    res.status(201).json({message:'User registered successfully'});
});
//login route
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user = await User.findOne({ username });
    if(!user){
        throw new AuthenticationError('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new AuthenticationError('Invalid username or password');
    }
    const token=jwt.sign({userId:user._id},JWT_SECRET);
    res.status(200).json({token});
});
app.get('/profile', isLoggedIn, async(req, res) => {
    const { userId } = req;
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new BadRequestError('Invalid UserId');
    }
    res.json(user);;
})
/* -------------------- 404 Route -------------------- */
app.use((req, res, next) => {
    next(new NotFoundError('Route not found'));
});

/* -------------------- Global Error Handler -------------------- */
app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
});

/* -------------------- Server -------------------- */
app.listen(1234, () => {
    console.log('🚀 Server running at http://localhost:1234');
});