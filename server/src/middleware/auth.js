import jwt from 'jsonwebtoken';
const JWT_SECRET = "FD86118B3687B5773B193B215274F";

export const isLoggedIn=(req,res,next)=>{
    const authHeader = req.headers?.authorization;
    if (!authHeader) return next(new Error('No token provided'));
    
    const token = authHeader.replace('Bearer ','');
    try {
        const {userId} = jwt.verify(token, JWT_SECRET);
        req.userId = userId;
        return next();
    }
    catch (err) {
        return next(err);
    }
}