import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: { type: String, required:true },
    email: { type: String, required:true, unique:true },
    password: { type: String, required:true },
    role: { type: String, default:'Teacher' },
},{timestamps:true});


export default mongoose.model('Teacher',teacherSchema,'teachers');