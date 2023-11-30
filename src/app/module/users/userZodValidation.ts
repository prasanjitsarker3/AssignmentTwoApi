import { z } from 'zod';

export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidation = z.object({
  firstName: z.string({ required_error: 'FirstName Required' }).min(1),
  lastName: z.string({ required_error: 'LastName Required' }).min(1),
});

const addressValidation = z.object({
  street: z.string({ required_error: 'Street Required' }),
  city: z.string({ required_error: 'City Required' }),
  country: z.string({ required_error: 'Country Required' }),
});

const userValidationSchema = z.object({
  userId: z.number({ required_error: 'UserID  Required' }),
  username: z.string({ required_error: 'Username Required' }),
  password: z.string({ required_error: 'Password  Required' }).max(12),
  fullName: userValidation,
  age: z.number({ required_error: 'Age  Required' }),
  email: z
    .string({ required_error: 'Email Required' })
    .email('Invalid email format.'),
  isActive: z.boolean({ required_error: 'isActive  Required' }),
  hobbies: z.array(z.string()).default([]),
  address: addressValidation,
  orders: z.array(OrderSchema).default([]),
});

export default userValidationSchema;
