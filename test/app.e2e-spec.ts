import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/modules/main/app.module";
import { ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "../src/swagger";

describe("AppController (e2e)", () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupSwagger(app);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(401)
      .expect({ statusCode: 401, error: "Unauthorized" });
  });

  it("/api/auth/login (POST) validate username is alpha", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "123456789",
        password: "asdasd12321",
      })
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: [
          {
            target: {
              username: "123456789",
              password: "asdasd12321",
            },
            value: "123456789",
            property: "username",
            children: [],
            constraints: {
              isAlpha: "username must contain only letters (a-zA-Z)",
            },
          },
        ],
      });
  });

  it("/api/auth/login (POST) validate password is at least 8 characters", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "asdasdsdads",
        password: "213",
      })
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: [
          {
            target: {
              username: "asdasdsdads",
              password: "213",
            },
            value: "213",
            property: "password",
            children: [],
            constraints: {
              minLength:
                "password must be longer than or equal to 8 characters",
            },
          },
        ],
      });
  });

  it("/api/auth/login (POST) login with unregistered account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        username: "msanvarov",
        password: "SOMEFAKEPASS",
      })
      .expect(401)
      .expect({
        statusCode: 401,
        error: "Unauthorized",
        message: "Wrong login combination!",
      });
  });

  it("/api/auth/register (POST) create an account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "test",
        email: "test.test@gmail.com",
        password: "asdasd12321",
      })
      .expect(201);
  });

  it("/api/auth/register (POST) validate that the same account can't be created twice", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "test",
        email: "test.test@gmail.com",
        password: "123456789",
      })
      .expect(406)
      .expect({
        statusCode: 406,
        error: "Not Acceptable",
        message: "The username specified already exists in system.",
      });
  });

  it("teardown", async () => {
    return request(app.getHttpServer())
      .delete("/api/profile/test")
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
