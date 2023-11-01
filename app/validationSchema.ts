import z from 'zod';

export const mileStoneSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(65535),
});
