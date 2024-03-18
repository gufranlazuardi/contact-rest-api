import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { Contact, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserValidation } from "../validation/user-validation";

export class ContactService {
  // POST Contact
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    // bikin record karena gaada username, jadi ditambahin disini
    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }

  // Agar pengecekannya dan penulisannya lebih simple, bisa dibuat fungsi ini
  static async checkContactMustExists(
    username: string,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  // GET Contact
  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);

    return toContactResponse(contact);
  }

  // UPDATE Contact
  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    // validasi dulu datanya
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    await this.checkContactMustExists(user.username, updateRequest.id);

    // update ke database
    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }
}
