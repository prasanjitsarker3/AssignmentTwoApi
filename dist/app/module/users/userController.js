"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const zod_1 = require("zod");
const userZodValidation_1 = __importDefault(require("./userZodValidation"));
const userService_1 = require("./userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParseData = userZodValidation_1.default.parse(userData);
        const result = yield userService_1.userServices.createUserIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: error.message || 'Validation Error',
                errors: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something Went Wrong',
            error: error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield userService_1.userServices.getSingleUserFromDb(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User retrieve successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
const getUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const result = yield userService_1.userServices.getUserUpdateFromDb(Number(userId), userData);
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
const deletedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield userService_1.userServices.deletedUserFromDb(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User Not Found!',
                },
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
const addProductToDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orderData = req.body;
        yield userService_1.userServices.addProductToDB(Number(userId), orderData);
        res.json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
const getOrdersFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield userService_1.userServices.getOrdersFromDB(Number(userId));
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }
        res.json({
            success: true,
            message: 'Orders fetched successfully!',
            data: {
                orders,
            },
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
});
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const totalPrice = yield userService_1.userServices.calculateTotalPrice(Number(userId));
        res.json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice,
            },
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    getUpdateUser,
    deletedUser,
    addProductToDB,
    getOrdersFromDB,
    calculateTotalPrice,
};
