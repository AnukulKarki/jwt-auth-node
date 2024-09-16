import jwt from "jsonwebtoken";
import "dotenv/config";

export default (req, res, next)=>{
    try{
        const token = req.headers.token;
        console.log("Token"+token);
        
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY );
            console.log("Decoded"+decoded.id, decoded.email);
            req.decoded = decoded;
            if(decoded){
                next();
            }else{
                res.status(403).json({success:false, message:"Invalid token"});
            }
        }else{
            res.status(403).json({success:false, message:"Token not found"});
        }
    }catch(err){
        res.status(403).json({success:false, message:"Invalid token"});
    }
}