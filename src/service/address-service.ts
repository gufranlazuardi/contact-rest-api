import { User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  // Create Address
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

  // Get Address
  // parameternya dibikin object baru di GetAddressRequest
  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExists(
      user.username,
      request.contactId
    );

    const address = await prismaClient.address.findFirst({
      where: {
        id: getRequest.id,
        contact_id: getRequest.contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return toAddressResponse(address);
  }
}
