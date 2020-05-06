import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";

describe("AppController (e2e)", () => {
  let app;
  let bearer;
  let payload;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/ (GET) unauthorized get request", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(401)
      .expect({ statusCode: 401, message: "Unauthorized" });
  });

  it("/api/auth/login (POST) validate username is alphanumeric", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "@#!@@/$%%^)(*+_=",
        password: "test123456789",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["username must contain only letters and numbers"],
      });
  });

  it("/api/auth/login (POST) validate password is at least 8 characters", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "test",
        password: "<8",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["password must be longer than or equal to 8 characters"],
      });
  });

  it("/api/auth/login (POST) try to login with unregistered account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "BeforeCreatedProfiles",
        password: "IDontExist?1234",
      })
      .expect(401)
      .expect({
        statusCode: 401,
        error: "Unauthorized",
        message: "Could not authenticate. Please try again.",
      });
  });

  it("/api/auth/register (POST) create an account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "test",
        name: "Test Richard",
        email: "test.test@gmail.com",
        password: "test123456789",
      })
      .expect(201);
  });

  it("/api/auth/login (POST) login to created account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "test",
        password: "test123456789",
      })
      .expect(201)
      .then((res) => (bearer = res.body.token));
  });

  it("/ (GET) fetch main route when authorized", () => {
    return request(app.getHttpServer())
      .get("/")
      .set("Authorization", `Bearer ${bearer}`)
      .expect(200);
  });

  it("/request/user (GET) get request user object", () => {
    return request(app.getHttpServer())
      .get("/request/user")
      .set("Authorization", `Bearer ${bearer}`)
      .expect(200);
  });

  it("/api/auth/register (POST) validate that the same account fails to register", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "test",
        name: "test sir",
        email: "test.test@gmail.com",
        password: "123456789",
      })
      .expect(406)
      .expect({
        statusCode: 406,
        error: "Not Acceptable",
        message:
          "The account with the provided username currently exists. Please choose another one.",
      });
  });

  it("/api/auth/register (POST) create an account to delete", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "delete",
        name: "to delete",
        email: "delete.test@gmail.com",
        password: "123456789",
      })
      .expect(201);
  });

  it("/api/profile/{username} (GET) fetch created account", () => {
    return request(app.getHttpServer())
      .get("/api/profile/test")
      .set("Authorization", `Bearer ${bearer}`)
      .expect(200)
      .then((res) => (payload = res.body));
  });

  it("/api/profile (PATCH) update created account information", () => {
    return request(app.getHttpServer())
      .patch("/api/profile")
      .set("Authorization", `Bearer ${bearer}`)
      .send({
        ...payload,
        name: "changing name",
        email: "changed.emal@gmail.com",
      })
      .expect(200)
      .expect({
        ...payload,
        name: "changing name",
        email: "changed.emal@gmail.com",
      });
  });

  it("/api/profile/{username} (DELETE) teardown created account", () => {
    return request(app.getHttpServer())
      .delete("/api/profile/delete")
      .set("Authorization", `Bearer ${bearer}`)
      .expect(200)
      .expect({
        message: "Deleted delete from records",
      });
  });

  it("/api/profile/{username} (DELETE) teardown main account", () => {
    return request(app.getHttpServer())
      .delete("/api/profile/test")
      .set("Authorization", `Bearer ${bearer}`)
      .expect(200)
      .expect({
        message: "Deleted test from records",
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
