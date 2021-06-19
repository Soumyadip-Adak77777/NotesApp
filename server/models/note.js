import mongoose from 'mongoose';
import { APP_URL } from '../config';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: { type: String, required:true },
    stream: { type: String, required:true },
    semester: { type: Number, required:true },
    author: { type: String, required:true },
    notepath: { type:String , required:true, get:(notepath)=>{
        return `${APP_URL}/${notepath}`;
    } },
},{timestamps:true, toJSON:{getters:true}});


export default mongoose.model('Note',noteSchema,'notes');