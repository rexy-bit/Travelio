
import prisma from "../config/prisma.js";



export const modifyName = async(req , res , next) => {

    try{

        const userId = req.params.id;

        const {firstName, lastName} = req.body;

        const user = await prisma.user.findUnique({
            where : {
                id : userId
            },
            include: {
                favorites : true
            }
        });

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error user not found",

            });
        }

        if(!firstName || !lastName || firstName === "" || lastName === ""){
            return res.status(400).json({
                success : false,
                message : "Please provide valid first and last names"
            });
        }else if(firstName.trim() === user.firstName.trim() && lastName.trim() === user.lastName.trim()){
                return res.status(200).json({
                    success : true,
                    message : "No changes required",
                    data: user
                });
            
        }else{
              
           const updatedUser = await prisma.user.update({
                where : {
                    id : userId
                },
                data: {
                    firstName,
                    lastName
                },
                include: {
                    favorites : true
                }
            });

            return res.status(200).json({
                success: true,
                message : "Modifications done with success",
                data : updatedUser
            });
        }

    }catch(err){
        next(err);
    }
}