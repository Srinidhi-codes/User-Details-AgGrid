import express from 'express'
import { deleteUser, getAllUser, getUserById, updateUser } from '../controllers/userController.js';
import { requiredSignIn } from '../middleware/userMiddleware.js';

const router = express.Router();

router.get('/', getAllUser, requiredSignIn);
router.get('/:id', getUserById, requiredSignIn);
router.put('/:id', updateUser, requiredSignIn);
router.delete('/:id', deleteUser, requiredSignIn);

export default router;