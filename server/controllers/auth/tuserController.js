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
    },
    async index(req,res,next){
        let documents;
        //pagination => mongoose pagination for larger no of notes
        try{
            documents = await Teacher.find().select('-updatedAt -__v -password').sort({createdAt:-1});

        }catch(err){
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    },
    async destroy(req,res,next){
        const document = await Teacher.findOneAndRemove({_id:req.params.id});
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        
        res.json(document);
    },
    async update(req,res,next){
        
            const { name,email} =req.body;

            let document;

            try{
                document = await Teacher.findOneAndUpdate({_id:req.params.id},{
                    name:name,                
                },{new:true});

            }catch(err){
                return next(err);
            }

            res.status(201).json(document);
        
    },
};

export default tuserController;