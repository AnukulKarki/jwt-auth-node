import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default class AuthController {
    async authenticate(req, res){
        try{
            const response = await userModel.findOne({
                where:{
                    email:req.body.email,
                }
            });
            console.log(response);
            if(response === null){
                console.log("User not found");
                return res.status(404).json({success:false, message:"User Not Found"});
            }else{
                const match = bcrypt.compareSync(req.body.password, response.password);
                if(match){
                    //jwt
                    const token = jwt.sign({id:response.id, email:response.email}, process.env.JWT_SECRET_KEY , {expiresIn:60*60*24});
                    response.dataValues.token = token;
                    delete response.dataValues.password;
                    res.status(200).json({success:true, message:"User authenticated", data:response});
                }else{
                    res.status(401).json({success:false, message:"Invalid Credentials"});
                }
            }
        }catch(err){
            res.status(400).json(err);
        }
    };

    async addAuth(req, res){
        try{
            const response = await userModel.create({...req.body});
            if(response){
                res.status(200).json({success:true, message:"User created successfully", data:response});
            }else{
                res.status(400).jspn({success:false, message:"Failed to create user"});
            }
        }catch(err){
            console.log("Err",err);
            res.status(400).json(err);
        }
    };

    async listUser(req, res){
        try{
            const response = await userModel.findAll();
            if(response){
                res.status(200).json({data:response, decodedData: req.decoded.id, decodedData2: req.decoded.email});
            }else{
                res.status(400).json({success:false, message:"Failed to list user"});
            }
        }catch(err){
            res.status(400).json("Unable to fetch data from database");
        }
    }
};