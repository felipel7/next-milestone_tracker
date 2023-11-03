import { Status } from '@prisma/client';
import z from 'zod';

export const patchMileStoneSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required')
    .max(255)
    .optional()
    .nullable(),
  status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.ACHIEVED]).optional(),
});
