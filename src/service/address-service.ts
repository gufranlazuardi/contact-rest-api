import { User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    // validasi dulu
    const createReqeust = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    // abis validasi, cek dulu contactnya beneran ada apa tidak. bisa pake contactMustExist
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.create({
      data: createReqeust,
    });

    return toAddressResponse(address);
  }
}
