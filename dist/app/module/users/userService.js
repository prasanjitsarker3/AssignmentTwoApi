"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const cleanUser = (userObject) => {
    const { password } = userObject, cleanUser = __rest(userObject, ["password"]);
    return cleanUser;
};
//Create User In Database
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.create(userData);
    const _a = result.toObject(), { password } = _a, cleanUser = __rest(_a, ["password"]);
    return cleanUser;
});
//All User Access
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.find({});
    const allUser = result.map((user) => cleanUser(user.toObject()));
    return allUser;
});
//Single User Access By Id
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ userId }, '-password');
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const singleUser = cleanUser(user.toObject());
    return singleUser;
});
//Update User
const getUserUpdateFromDb = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOneAndUpdate({ userId }, userData, {
        new: true,
        runValidators: true,
        select: '-password',
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const updateUser = cleanUser(user.toObject());
    return updateUser;
});
// Deleted User in Single
const deletedUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOneAndDelete({ userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
});
// Orders Products
const addProductToDB = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }
    user.orders = user.orders || [];
    user.orders.push(productData);
    yield user.save();
    return user.orders;
});
//Get All Orders
const getOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const allOrders = user ? user.orders : null;
    return allOrders;
});
//Calculation product price
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield userModel_1.default.findOne({ userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const totalPrice = parseFloat((((_b = user.orders) === null || _b === void 0 ? void 0 : _b.reduce((data, order) => data + order.price * order.quantity, 0)) || 0).toFixed(2));
    return totalPrice;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDb,
    getUserUpdateFromDb,
    deletedUserFromDb,
    addProductToDB,
    getOrdersFromDB,
    calculateTotalPrice,
};
