
// import { Note } from "../../models"
// // const shortid = require("shortid");
// // const slugify = require("slugify");

// const createnotesController={
//  createNote = (req, res) => {
//     //res.status(200).json( { file: req.files, body: req.body } );

//     const { name,
//         stream,
//         semester,
//         author } = req.body;
//     let notesfile = [];

//     const filepath = req.file.path;

//     if (req.files.length > 0) {
//         notesfile = req.files.map((file) => {
//             return { notepath : file.location };
//         });
//     }

//     const note = new Note({
//         name: name,
//         stream:stream,
//         semester:semester,
//         author: author,
//         notepath:filepath,
//     });

//     note.save((error, note) => {
//         if (error) return res.status(400).json({ error });
//         if (note) {
//             res.status(201).json({ note, files: req.files });
//         }
//     });
// },

// updateNote = (req, res) => {
//     //res.status(200).json( { file: req.files, body: req.body } );

//     const { name,stream,semester,author} =req.body;

//     const filepath = req.file.path;

//     let document;

//     try{
//         document = Note.findOneAndUpdate({_id:req.params.id},{
//             name:name,
//             stream:stream,
//             semester:semester,
//             author:author,
//             ...(req.file && {notepath:filepath})
            
//         },{new:true});

//     }catch(err){
//         return next(err);
//     }

    
// },

// getNoteDetailsById = (req, res) => {

//     const { productId } = req.params;
//     if (productId) {
//         Note.findOne({ _id: productId }).exec((error, note) => {
//             if (error) return res.status(400).json({ error });
//             if (note) {
//                 res.status(200).json({ note });
//             }
//         });
//     } else {
//         return res.status(400).json({ error: "Params required" });
//     }
// },
// deleteNoteById = (req, res) => {
//     const { productId } =  req.params;
//     if (productId) {
//         Note.deleteOne({ _id: productId }).exec((error, result) => {
//             if (error) return res.status(400).json({ error });
//             if (result) {
//                 res.status(202).json({ result });
//             }
//         });
//     } else {
//         res.status(400).json({ error: "Params required" });
//     }
// },
// getNotes = async (req, res) => {
//     const notes = await Product.find({ createdBy: req.user._id }).select('-updatedAt -__v').sort({createdAt:-1});


//     res.status(200).json({ notes });
// }
// }



// export default cloudnotesController