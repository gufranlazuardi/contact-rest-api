import { number, z, ZodType } from "zod";

export class AddressValidation {
  // create address
  static readonly CREATE: ZodType = z.object({
    // harus ngirim contactId nya siapa
    contact_id: z.number().positive(),
    street: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  });

  static readonly GET: ZodType = z.object({
    // harus ngirim contactId nya siapa
    contact_id: z.number().positive(),
    id: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
    street: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  });

  static readonly REMOVE: ZodType = z.object({
    // harus ngirim contactId nya siapa
    contact_id: z.number().positive(),
    id: z.number().positive(),
  });
}
