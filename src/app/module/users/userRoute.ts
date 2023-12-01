import express from 'express';
import { userController } from './userController';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.patch('/:userId', userController.getUpdateUser);
router.delete('/:userId', userController.deletedUser);
router.put('/:userId/orders', userController.addProductToDB);
router.get('/:userId/orders', userController.getOrdersFromDB);
router.get('/:userId/orders/total-price', userController.calculateTotalPrice);

export const userRoutes = router;
