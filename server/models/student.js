import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required:true },
    email: { type: String, required:true, unique:true },
    stream: { type: String, required:true },
    semester: { type: Number, required:true },
    password: { type: String, required:true },
    role: { type: String, default:'student' },
},{timestamps:true});


export default mongoose.model('Student',studentSchema,'students');