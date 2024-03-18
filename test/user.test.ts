import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test.util";
import bcrypt from "bcrypt";

// cara running testnya 'npm test'

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  // diawal selalu bikin test user baru
  beforeEach(async () => {
    await UserTest.create();
  });

  // diakhir selalu hapus data usernya
  afterEach(async () => {
    await UserTest.delete();
  });

  // kalo berhasil login
  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined(); // karena token susah, yang penting ada aja
  });

  // kalo usernamenya salah
  it("should reject login if username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  // kalo passwordnya salah
  it("should reject login if username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe(`GET /api/users/current`, () => {
  // seperti biasa diawal bikin usernya dan diakhiri dengan dihapus
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  // bikin dua skenario, ketika bisa dan tidak bisa
  // ini yang bisa
  it("should be able to get user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  // ini yang gabisa (tokennya salah)
  it("should reject get user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject update request if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/user/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "",
        name: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update user if token is wrong", async () => {
    const response = await supertest(web)
      .patch("/api/user/current")
      .set("X-API-TOKEN", "salah")
      .send({
        password: "benar",
        name: "benar",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should be able to update username", async () => {
    const response = await supertest(web)
      .patch("/api/user/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "benar",
        name: "benar",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("benar");
  });

  it("should be able to update password", async () => {
    const response = await supertest(web)
      .patch("/api/user/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "benar",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);

    // karena passwordnya di hashing dan kita tidak tau, query ke database
    const user = await UserTest.get();
    expect(await bcrypt.compare("benar", user.password)).toBe(true);
  });
});

describe("DELETE /api/users/current", () => {
  // diawal selalu bikin test user baru
  beforeEach(async () => {
    await UserTest.create();
  });

  // diakhir selalu hapus data usernya
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get();
    expect(user.token).toBeNull();
  });

  it("should reject logout user if token is wrong", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
