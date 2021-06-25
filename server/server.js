import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_URL,APP_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import path from 'path';


const app=express();

import routes from './routes';



//Database Connection
mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('DB connected...');
});
//

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.use('/api',routes);
app.use('/uploads',express.static('uploads'));


app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Backend listening on port ${PORT}`);
});