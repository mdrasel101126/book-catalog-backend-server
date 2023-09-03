import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'Book id is required!',
        }),
        quantity: z.number({
          required_error: 'Quantity is required',
        }),
      }),
      {
        required_error: 'Order is required',
      }
    ),
    status: z.enum(['pending', 'shipped', 'delivered']).optional(),
  }),
});

export const OrderValidation = { createOrder };
