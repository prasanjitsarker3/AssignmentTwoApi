"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidation = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: 'FirstName Required' }).min(1),
    lastName: zod_1.z.string({ required_error: 'LastName Required' }).min(1),
});
const addressValidation = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'Street Required' }),
    city: zod_1.z.string({ required_error: 'City Required' }),
    country: zod_1.z.string({ required_error: 'Country Required' }),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({ required_error: 'UserID  Required' }),
    username: zod_1.z.string({ required_error: 'Username Required' }),
    password: zod_1.z.string({ required_error: 'Password  Required' }).max(12),
    fullName: userValidation,
    age: zod_1.z.number({ required_error: 'Age  Required' }),
    email: zod_1.z
        .string({ required_error: 'Email Required' })
        .email('Invalid email format.'),
    isActive: zod_1.z.boolean({ required_error: 'isActive  Required' }),
    hobbies: zod_1.z.array(zod_1.z.string()).default([]),
    address: addressValidation,
    orders: zod_1.z.array(exports.OrderSchema).default([]),
});
exports.default = userValidationSchema;
