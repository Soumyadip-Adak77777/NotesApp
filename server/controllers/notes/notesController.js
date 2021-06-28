import { Note } from "../../models"
import multer from 'multer';
// import multerS3 from 'multer-s3';
import path from 'path';
import fs from 'fs';
import Joi from 'joi';
import CustomErrorHandler from "../../services/CustomErrorHandler";
// import aws from 'aws-sdk';
// import uploadS3 from "../../middlewares/upload";



const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
});


const handleMultipartData = multer({storage,limits:{fileSize: 1000000*5}}).single('notepath'); 

const { uploadFile } = require('../../s3')
//////
// const s3 =new aws.S3({
//     accessKeyId:"AKIAUET7DJ2A3YXKSKXF",
//     secretAccessKey:"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",
// })

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'uploadnotes',
//       acl:'public-read',
//       filename: function (req, file, cb) {
//         const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
//         cb(null, uniqueName);
//       }
//     })
//     ,limits:{fileSize: 1000000*5}}).single('notepath');
//////
const notesController = {
    async store(req,res,next){
        //multipart form data
        handleMultipartData (req,res,async (err) => {

            const file =req.file
            const result = await uploadFile(file);
            console.log(result);
            const notesurl=`https://uploadnotes.s3.us-east-2.amazonaws.com/${result.Key}`
            

            // if(err){
            //     console.log(err);
            //     return next(CustomErrorHandler.serverError(err.message));
            // }
            // const filePath = req.file.path;
            //validation
            const noteSchema = Joi.object({
                name: Joi.string().required(),
                stream: Joi.string().required(),
                semester: Joi.number().required(),
                author: Joi.string().required(),
                notepath: Joi.string()
            });
    
            const {error} = noteSchema.validate(req.body);
    
            // if(error)
            // {
            //     //delete
            //     // fs.unlink(`${appRoot}/${filePath}`,(err)=>{
            //     //     if(err)
            //     //     {
            //     //         console.log(err)
            //     //         return next(CustomErrorHandler.serverError(err.message));
            //     //     }
                    
            //     // });
            //     fs.unlink('/uploads',(err)=>{
            //         if(err)
            //         {
            //             console.log(err)
            //             return next(CustomErrorHandler.serverError(err.message));
            //         }
                    
            //     });
            //     return next(error);
            // }

            const { name,stream,semester,author} =req.body;

            let document;

            try{
                document = await Note.create({
                    name:name,
                    stream:stream,
                    semester:semester,
                    author:author,
                    notepath:notesurl,
                });
            }catch(err){
                return next(err);
            }

            res.status(201).json(document);
        });

    },
    update(req,res,next){
        //multipart form data
        handleMultipartData (req,res,async (err) => {
            // if(err){
            //     return next(CustomErrorHandler.serverError(err.message));
            // }
            let filePath;
            if(req.file){
                filePath = req.file.path;
            }
            
            //validation
            const noteSchema = Joi.object({
                name: Joi.string().required(),
                stream: Joi.string().required(),
                semester: Joi.number().required(),
                author: Joi.string().required(),
                notepath: Joi.string()
            });
    
            const {error} = noteSchema.validate(req.body);
    
            // if(error)
            // {
            //     if(req.file){
            //         //delete
            //         fs.unlink('/uploads',(err)=>{
            //             if(err)
            //             {
                            
            //                 return next(CustomErrorHandler.serverError(err.message));
            //             }
                        
            //         });
            //     }
            //     return next(error);
            // }

            const { name,stream,semester,author} =req.body;

            let document;

            try{
                document = await Note.findOneAndUpdate({_id:req.params.id},{
                    name:name,
                    stream:stream,
                    semester:semester,
                    author:author,
                    ...(req.file && {notepath:filePath})
                    
                },{new:true});

            }catch(err){
                return next(err);
            }

            res.status(201).json(document);
        });
    },
    async destroy(req,res,next){
        const document = await Note.findOneAndRemove({_id:req.params.id});
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        //image delete
        // const filepath=document._doc.notepath;
        // fs.unlink(`${appRoot}/${filepath}`,(err)=>{
        //     if(err){
        //         return next(CustomErrorHandler.serverError());
        //     }
        // });
        // res.json(document);
    },
    async index(req,res,next){
        let documents;
        //pagination => mongoose pagination for larger no of notes
        try{
            documents = await Note.find().select('-updatedAt -__v').sort({createdAt:-1});

        }catch(err){
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    },
    async nme(req,res,next){
        let document;
        //pagination => mongoose pagination for larger no of notes
        try{
            document = await Note.findOne({_id:req.params.id});

        }catch(err){
            return next(CustomErrorHandler.serverError());
        }
        return res.json(document);
    },
    async destroyone(req,res,next){
        const document = await Note.findOneAndRemove({_id:req.params.id});
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        
        res.json(document);
    },
    download(req,res){
        const key=req.params.key
        const readStream = getFileStream(key)
        readStream.pipe(res)
    },
    
   

    
};

export default notesController;