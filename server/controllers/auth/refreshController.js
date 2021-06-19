import Joi from 'joi';
import { REF_SECRET } from '../../config';
import { RefreshToken, Teacher, Student } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';

const refreshController = {
    async srefresh(req,res,next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
            
        });

        const {error} = refreshSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        //check in database
        let refreshtoken;

        try{
            refreshtoken = await RefreshToken.findOne({token:req.body.refresh_token});
            if(!refreshtoken){
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            let userId;
            try{
                const { _id } = await JwtService.verify(refreshtoken.token,REF_SECRET);
                userId = _id;
            }catch(err){
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            
            const student=await Student.findOne({_id:userId});
            if(!student ){
                return next(CustomErrorHandler.unAuthorized('No user found'));
            }
 
            //tokens
            //token generate
            const access_token = JwtService.sign({_id:student._id,role:student.role});
            const refresh_token = JwtService.sign({_id:student._id,role:student.role},'1y',REF_SECRET);

            //Refresh token Send to database
            await RefreshToken.create({token: refresh_token});

            res.json({access_token:access_token,refresh_token:refresh_token}); 


        }catch(err){
            return next(new Error('Somthing went wrong'+err.message));
        }

    },
    async trefresh(req,res,next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
            
        });

        const {error} = refreshSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        //check in database
        let refreshtoken;

        try{
            refreshtoken = await RefreshToken.findOne({token:req.body.refresh_token});
            if(!refreshtoken){
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            let userId;
            try{
                const { _id } = await JwtService.verify(refreshtoken.token,REF_SECRET);
                userId = _id;
            }catch(err){
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            const teacher=await Teacher.findOne({_id:userId});
            
            if(!teacher ){
                return next(CustomErrorHandler.unAuthorized('No user found'));
            }
 
            //tokens
            //token generate
            const access_token = JwtService.sign({_id:teacher._id,role:teacher.role});
            const refresh_token = JwtService.sign({_id:teacher._id,role:teacher.role},'1y',REF_SECRET);

            //Refresh token Send to database
            await RefreshToken.create({token: refresh_token});

            res.json({access_token:access_token,refresh_token:refresh_token}); 


        }catch(err){
            return next(new Error('Somthing went wrong : '+err.message));
        }

    }
}

export default refreshController;