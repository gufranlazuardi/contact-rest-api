import { z, ZodType } from "zod";

export class ContactValidation {
  // create contact
  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
  });

  // update contact
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
  });
}
