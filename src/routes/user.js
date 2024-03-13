import { Router } from 'express';
import { userRegister, userlogin,  updateDetails, deleteDetails, changePassword , getUserById} from '../controller/user.js';

const router = Router();

router.post('/Register', userRegister);
router.post('/login', userlogin);
router.put('/updateDetails/:id', updateDetails);
router.delete('/deleteDetails/:id', deleteDetails);
router.put('/changePassword/:id', changePassword);
router.get('/getUserById/:id', getUserById);

export default router;