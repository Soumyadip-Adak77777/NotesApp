import Joi from 'joi';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { RefreshToken, Teacher } from '../../models';
import JwtService from '../../services/JwtService';
import { REF_SECRET } from '../../config';
 


const tregisterController = {
    async tregister(req,res,next){
        //validation by ***joi***
        const tregisterSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirm_password: Joi.ref('password'),
        });

        const { error } = tregisterSchema.validate(req.body);

        if(error){
            return next(error); 
        }

        try{
            const exist = await Teacher.exists({email:req.body.email});
            if(exist){
                return next(CustomErrorHandler.alreadyExist('This email is already taken...'));
            }
        }catch(err){
            return next(err);
        }

        const {name, email, password} = req.body;
        //Hash Password by ***bcrypt***
        const hashedPassword = await bcrypt.hash(password,10);
        
        //prepare the model
        
        const teacher = new Teacher({
            name:name,
            email:email,
            password:hashedPassword
        });

        let access_token;
        let refresh_token;

        //save to database
        try{
            const result = await teacher.save();
            //token by ***jsonwebtoken***
            access_token = JwtService.sign({_id:result._id,role:result.role});
            refresh_token = JwtService.sign({_id:result._id,role:result.role},'1y',REF_SECRET);

            //Refresh token Send to database
            await RefreshToken.create({token: refresh_token});

        }catch(err){
            return next(err);
        }


        res.json({access_token:access_token,refresh_token:refresh_token});
    }
}

export default tregisterController;