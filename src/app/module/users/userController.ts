/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import userValidationSchema from './userZodValidation';
import { userServices } from './userService';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: error.message || 'Validation Error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.getSingleUserFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User retrieve successfully',
      data: result,
    });
  } catch (error: any) {
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
};

const getUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData: any = req.body;
    const result = await userServices.getUserUpdateFromDb(
      Number(userId),
      userData
    );

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
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
};

const deletedUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.deletedUserFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
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
};

const addProductToDB = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;

    await userServices.addProductToDB(Number(userId), orderData);
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
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
};

const getOrdersFromDB = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await userServices.getOrdersFromDB(Number(userId));

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
  } catch (error: any) {
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
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const totalPrice: number = await userServices.calculateTotalPrice(
      Number(userId)
    );

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
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
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getUpdateUser,
  deletedUser,
  addProductToDB,
  getOrdersFromDB,
  calculateTotalPrice,
};
