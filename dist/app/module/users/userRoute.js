"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const router = express_1.default.Router();
router.post('/', userController_1.userController.createUser);
router.get('/', userController_1.userController.getAllUsers);
router.get('/:userId', userController_1.userController.getSingleUser);
router.patch('/:userId', userController_1.userController.getUpdateUser);
router.delete('/:userId', userController_1.userController.deletedUser);
router.put('/:userId/orders', userController_1.userController.addProductToDB);
router.get('/:userId/orders', userController_1.userController.getOrdersFromDB);
router.get('/:userId/orders/total-price', userController_1.userController.calculateTotalPrice);
exports.userRoutes = router;
