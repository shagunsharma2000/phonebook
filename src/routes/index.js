import express from 'express';

import userRoutes from '../routes/user.js'; 
import phoneRoutes from '../routes/phone.js'; 

const router = express.Router();

 router.use('/user', userRoutes);
 router.use('/phone', phoneRoutes);


export default router;
