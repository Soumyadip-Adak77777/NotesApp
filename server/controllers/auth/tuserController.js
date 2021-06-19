import { Teacher } from "../../models"
import CustomErrorHandler from "../../services/CustomErrorHandler"
const tuserController={
    async tme(req,res,next){
        try{
            const user=await Teacher.findOne({_id:req.user._id}).select('-password -updatedAt -__v ');
            if(!user){
                return next(CustomErrorHandler.notFound());
            }
            res.json(user);
        }catch(err){
            return next(err);
        }
    }
};

export default tuserController;