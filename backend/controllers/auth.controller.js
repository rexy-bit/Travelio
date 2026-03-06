import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET, NODE_ENV, REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from "../config/env.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateTokens = (userId) => {

    const accessToken = jwt.sign(
        {userId}
        , ACCESS_TOKEN_SECRET,
        {expiresIn : ACCESS_TOKEN_EXPIRATION}
      );


      const refreshToken = jwt.sign(
        {userId},
        REFRESH_TOKEN_SECRET,
        {expiresIn : REFRESH_TOKEN_EXPIRATION}
      );


      return {accessToken, refreshToken};

}

const setCookies = (res, accessToken, refreshToken) => {
    const cookieOptions = {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    };
    
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
};


export const signUp = async(req, res, next) => {

    try{


        const {firstName, lastName, email, password1, password2} = req.body;

        if(!firstName || firstName.trim() === "" || !lastName || lastName.trim() === "" ){
            return res.status(400).json({
                success : false,
                message : "Error provide a valid first name and last name"
            });
        }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

       if(!email || email.trim() === "" || !emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message : "Error email must be in correct and valid format"
        });
       }

       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

       if(password1 !== password2){
        return res.status(400).json({
            success : false,
            message : "The two passwords do not match"
        });
       }

       if(!password1 || password1.trim() === "" || password1.length < 6 || !passwordRegex.test(password1)){

        return res.status(400).json({
            success : false,
            message : "Please the password must be in correct and valid format"
        });
       }

       const existingUser = await prisma.user.findUnique({
        where : {email}
       });

       if(existingUser){
        return res.status(409).json({
            success : false,
            message : "User already registered"
        });

       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password1, salt);

       const newUser = await prisma.$transaction( async(tx) => {

        const user = await tx.user.create({
            data : {
                firstName,
                lastName,
                email,
                password : hashedPassword
            }
        })

        return user;
       });


       const {accessToken, refreshToken} = generateTokens(newUser.id);

       setCookies(res, accessToken, refreshToken);

       const userResponse = {
        id : newUser.id,
        firstName : newUser.firstName,
        lastName : newUser.lastName,
        email : newUser.email,
        role : newUser.role
       };

       return res.status(201).json({
        success : true,
        data: userResponse
       });

    }catch(err){
        next(err);
    }
    
}



export const signIn = async(req, res, next) => {

    try{

        const {email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

       if(!email || email.trim() === "" || !emailRegex.test(email)){
        return res.status(400).json({
            success: false,
            message : "Error email must be in correct and valid format"
        });
       }

       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

       if(!password || password.length < 8 || !passwordRegex.test(password)){

        return res.status(400).json({
            success : false,
            message : "Please enter a valid password"
        });
       }

        const existingUser = await prisma.user.findUnique({
            where : {email}
        });

         if(!existingUser){
            return res.status(404).json({
                success : false,
                message : "Error user not found"
            });
         }

         const isValidPassword = await bcrypt.compare(password, existingUser.password);

         if(!isValidPassword){
            return res.status(400).json({
                success : false,
                message : "Error invalid password"
            });
         }

                 const {accessToken, refreshToken} = generateTokens(existingUser._id);

        setCookies(res, accessToken, refreshToken);

        const newUser = {
            id : existingUser.id,
            firstName : existingUser.firstName,
            lastName : existingUser.lastName,
            role : existingUser.role
        }

        return res.status(200).json({
            success : true,
            message : "User signed in successfully",
            data: newUser
        });

    }catch(err){
        next(err);
    }
}


export const signOut = async(req , res, next) =>  {


    try{

        const cookieOptions = {

            httpOnly: true,
           secure: NODE_ENV === "production",
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            expires: new Date(0)
        };

        res.cookie("accessToken", "", cookieOptions);
        res.cookie("refreshToken", "", cookieOptions);


        res.status(200).json({
            success : true,
            message : "User signed out successfully"
        });
    }catch(err){
        next(err);

    }
}