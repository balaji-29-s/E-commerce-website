import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../core/ApiError.js';
const JWT_SECRET = "FD86118B3687B5773B193B215274F";

export const isLoggedIn=(req,res,next)=>{
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AuthenticationError('No token provided or invalid format'));
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const {userId} = jwt.verify(token, JWT_SECRET);
        req.userId = userId;
        return next();
    }
    catch (err) {
        return next(new AuthenticationError('Invalid or expired token'));
    }
}