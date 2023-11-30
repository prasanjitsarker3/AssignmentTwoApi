/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import User from './userModel';

const cleanUser = (userObject: any) => {
  const { password, ...cleanUser } = userObject;
  return cleanUser;
};

//Create User In Database
const createUserIntoDB = async (userData: any) => {
  const result = await User.create(userData);
  const { password, ...cleanUser } = result.toObject();
  return cleanUser;
};

//All User Access
const getAllUsersFromDB = async () => {
  const result = await User.find({});
  const allUser = result.map((user) => cleanUser(user.toObject()));
  return allUser;
};

//Single User Access By Id
const getSingleUserFromDb = async (userId: number) => {
  const user = await User.findOne({ userId }, '-password');
  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  const singleUser = cleanUser(user.toObject());
  return singleUser;
};

const getUserUpdateFromDb = async (userId: number, userData: any) => {
  const user = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const updateUser = cleanUser(user.toObject());
  return updateUser;
};

const deletedUserFromDb = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });
  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user;
};

// orders
const addProductToDB = async (userId: number, productData: any) => {
  const user = await User.findOne({ userId });
  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);
  await user.save();
  const finalOrders = user.orders;
  return finalOrders;
};

const getOrdersFromDB = async (userId: number) => {
  const user = await User.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  const allOrders = user ? user.orders : null;
  return allOrders;
};

const calculateTotalPrice = async (userId: number): Promise<number> => {
  const user = await User.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  const totalPrice: number = parseFloat(
    (
      user.orders?.reduce(
        (data, order) => data + order.price * order.quantity,
        0
      ) || 0
    ).toFixed(2)
  );
  return totalPrice;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDb,
  getUserUpdateFromDb,
  deletedUserFromDb,
  addProductToDB,
  getOrdersFromDB,
  calculateTotalPrice,
};
