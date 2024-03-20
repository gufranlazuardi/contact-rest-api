import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = Number(req.params.contact_id);

      const response = await AddressService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
