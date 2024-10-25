// src/lib/utils/validation.ts
import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
});