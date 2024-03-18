import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  UserResponse,
  toUserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import becrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    // cek username apakah sudah pernah ada atau tidak
    if (totalUserWithSameUsername !== 0) {
      throw new ResponseError(400, "Username already exist");
    }

    registerRequest.password = await becrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    // cek apakah passwordnya valid atau tidak
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    // jika tidak ada data usernya
    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    // jika usernya valid / ada
    const isPasswordValid = await becrypt.compare(
      loginRequest.password,
      user?.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    // paksa pake "!" karena tau pasti tidak nul
    return response;
  }

  // karena ini sudah login dan mau kembalikan data usernya
  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  // update user // karena harus ada user yang login, maka user: User
  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await becrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    // update tokennya jadi null
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(result);
  }
}
