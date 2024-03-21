import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  // Create Address
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    // validasi dulu
    const createReqeust = Validation.validate(AddressValidation.CREATE, request);

    // abis validasi, cek dulu contactnya beneran ada apa tidak. bisa pake contactMustExist
    await ContactService.checkContactMustExists(user.username, request.contact_id);

    const address = await prismaClient.address.create({
      data: createReqeust,
    });

    return toAddressResponse(address);
  }

  // biar lebih mudah cek address dan contact nya selalu ada, bikin function baru
  static async checkAddressMustExists(contactId: number, addressId: number): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  // Get Address
  // parameternya dibikin object baru di GetAddressRequest
  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactMustExists(user.username, request.contact_id);
    const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id);

    return toAddressResponse(address);
  }

  // Update Address
  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const updateRequest = Validation.validate(AddressValidation.UPDATE, request);

    // validasi harus ada contactnya dan addressnya
    await ContactService.checkContactMustExists(user.username, request.contact_id);
    await this.checkAddressMustExists(updateRequest.id, updateRequest.contact_id);

    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }
}
