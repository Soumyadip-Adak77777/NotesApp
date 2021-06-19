import { useRef } from "react";
import { Student } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"
const suserController={
    async sme(req,res,next){
        try{
            const user=await Student.findOne({_id:req.user._id}).select('-password -updatedAt -__v ');
            if(!useRef){
                return next(CustomErrorHandler.notFound());
            }
            res.json(user);
        }catch(err){
            return next(err);
        }
    }
};

export default suserController;