import z from 'zod';

export const createGoalSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(65535),
});
