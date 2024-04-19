import express from 'express';
import {
    registerUserCtrl,
    loginUserCtrl,
    getAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from '../controllers/announcementCtrl.js';
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const AnnouncementRoutes = express.Router();

AnnouncementRoutes.post('/register',registerUserCtrl);
AnnouncementRoutes.post('/login',loginUserCtrl);
AnnouncementRoutes.get('/getAll',isLoggedIn,getAllAnnouncements);
AnnouncementRoutes.post('/create',isLoggedIn,createAnnouncement);
AnnouncementRoutes.put('/update/:id',isLoggedIn,updateAnnouncement);
AnnouncementRoutes.delete('/delete/:id',isLoggedIn,deleteAnnouncement);

export default AnnouncementRoutes;
