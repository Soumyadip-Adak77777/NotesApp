import Joi from 'joi';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { Student, RefreshToken } from '../../models';
import JwtService from '../../services/JwtService'
import { REF_SECRET } from '../../config';

const sloginController={
    async slogin(req,res,next){
        //validation
        const sloginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const {error} = sloginSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        try{
            const student = await Student.findOne({email:req.body.email});

            if(!student){
                return next(CustomErrorHandler.wrongCredentials());
            }

            //compare password with database
            const match = await bcrypt.compare(req.body.password,student.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials()); 
            }

            //token generate
            const access_token = JwtService.sign({_id:student._id,role:student.role});
            const refresh_token = JwtService.sign({_id:student._id,role:student.role},'1y',REF_SECRET);

            //Refresh token Send to database
            await RefreshToken.create({token: refresh_token});

            res.json({access_token:access_token,refresh_token:refresh_token});

        }catch(err){
            return next(err);
        }

    },
    async logout(req,res,next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
            
        });

        const {error} = refreshSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        try{
            await RefreshToken.deleteOne({token:req.body.refresh_token});
        }catch(err){
            return next(new Error('Something went wrong in the database'));
        }
        res.json({status:1}); 
    }
};


export default sloginController;