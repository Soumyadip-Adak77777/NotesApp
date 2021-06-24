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
    },
    async index(req,res,next){
        let documents;
        //pagination => mongoose pagination for larger no of notes
        try{
            documents = await Student.find().select('-updatedAt -__v -password').sort({createdAt:-1});

        }catch(err){
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    },
    async destroy(req,res,next){
        const document = await Student.findOneAndRemove({_id:req.params.id});
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        
        res.json(document);
    },
    async update(req,res,next){
        
        const { name,stream,semester,email} =req.body;

        let document;

        try{
            document = await Student.findOneAndUpdate({_id:req.params.id},{
                name:name,
                stream:stream,
                semester:semester,                
            },{new:true});

        }catch(err){
            return next(err);
        }

        res.status(201).json(document);
    
},
};

export default suserController;