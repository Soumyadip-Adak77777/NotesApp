import { Teacher,Student } from "../models"
import CustomErrorHandler from "../services/CustomErrorHandler";

const role = async (req,res,next) =>{
    try{
        const user1 =await Teacher.findOne({_id:req.user._id});
        const user2 =await Student.findOne({_id:req.user._id});

        if(user1.role === 'teacher' || user2.role ==='teacher'){
            next();
        }else{
            return next(CustomErrorHandler.unAuthorized());
        }
    }catch(err){
        return next(CustomErrorHandler.serverError());
    }
}

export default role;