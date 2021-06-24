import express from 'express';

const router = express.Router();

import { tregisterController } from '../controllers'
import { sregisterController } from '../controllers'
import { tloginController } from '../controllers'
import { sloginController } from '../controllers'
import { tuserController } from '../controllers'
import { suserController,refreshController,notesController } from '../controllers'
import auth from '../middlewares/auth'
import role from '../middlewares/role'

//Teacher
//POST
//Register
router.post('/tregister',tregisterController.tregister);
//Login
router.post('/tlogin',tloginController.tlogin);
//Refresh Token
router.post('/trefresh',refreshController.trefresh);
//Logout
router.post('/tlogout',auth,tloginController.logout);
//Create Notes
router.post('/notes',[auth,role],notesController.store);
//GET
//Profile
router.get('/teacher',auth,tuserController.tme);
//Get All notes
router.get('/notes',notesController.index);
//PUT
//Update Notes
router.put('/notes/:id',[auth,role],notesController.update);
//DELETE
//Delete Notes
router.delete('/notes/:id',[auth,role],notesController.destroy);

//Student
//POST
//Register
router.post('/sregister',sregisterController.sregister);
//Login
router.post('/slogin',sloginController.slogin);
//Refresh Token
router.post('/srefresh',refreshController.srefresh);
//Logout
router.post('/slogout',auth,sloginController.logout);
//GET
//Profile
router.get('/student',auth,suserController.sme);



//Admin
//GET
//Get All Teachers profiles
router.get('/teachers',tuserController.index);
//Get All students profiles
router.get('/students',suserController.index);
//PUT
//Update Teacher
router.put('/teachers/:id',tuserController.update);
//Update Student
router.put('/students/:id',suserController.update);
//DELETE
//Delete one Teacher
router.delete('/teachers/:id',tuserController.destroy);
//Delete one student
router.delete('/students/:id',suserController.destroy);


export default router;