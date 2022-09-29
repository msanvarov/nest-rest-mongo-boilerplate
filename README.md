<h1 align="center">API Starter</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

<p align="center">
	<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
	<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
	<a href="https://travis-ci.org/msanvarov/nest-rest-mongo-boilerplate"><img src="https://travis-ci.org/msanvarov/nest-rest-mongo-boilerplate.svg?branch=master" alt="Travis" /></a>
	<a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
	<a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

Table of Contents:

1. [Description](#-description)
2. [Prerequisites](#%EF%B8%8F-prerequisites)
3. [Deployment](#-deployment)
4. [Environment Configuration](#-environment-configuration)
5. [Choosing a Web Framework](#-choosing-a-web-framework)
6. [HTTP2](#-http2)
7. [Choosing a Database](#-choosing-a-database)
8. [Testing](#-testing)
9. [TypeDocs](#-typedocs)
10. [Logs](#-logs)

🔎 This repo was created with [Nx](https://nx.dev/).

### 📚 Description

This boilerplate is made to quickly prototype backend applications. It comes with authentication/authorization, logging, crud features and database persistence out of the box.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have [Node.js](https://nodejs.org/en/download/) (16+) locally by downloading the Javascript runtime via `brew`, `choco`, or `apt-get`.

- Please make sure to have MongoDB locally by following the guide on the [MongoDB website](https://www.mongodb.com/docs/manual/installation/). MongoDB can be downloaded standalone via `brew`, `choco`, or `apt-get`.

> Remark: MongoDB can be easily deployed on a cloud provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - comes with a free tier option to get started quickly. This will bypass the requirement to have MongoDB locally.

#### Docker 🐳

- Please make sure to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) operational to quickly compose the required dependencies. Then follow the docker procedure outlined below.

---

### 🚀 Deployment

#### Manual Deployment without Docker

- Clone the repo via `git clone https://github.com/msanvarov/nest-rest-mongo-boilerplate`.

- Download dependencies via `npm i` or `yarn`.

- Create a **.env file** via the `cp .env.example .env` command and replace the existing environment variable placeholders with valid responses.

- Start the api in development mode by using `npm run start` (the app will be exposed on http://localhost:3333; not to conflict with React, Angular, or Vue ports).

<details open>
<summary>Optional deployment of the UI</summary>
<br>

- This repo comes with a UI built with [Angular](https://angular.io/) - that can be accessed via `http://localhost:4200`.

- To start the UI, start a new terminal window and run `npm run start --project ui`.

> Remark: In the docker deployment, the UI is automatically started and served by the API.

</details>
<br/>

> Remark: For SQL databases, I created a boilerplate for [Nest and TypeORM](https://github.com/msanvarov/nest-rest-typeorm-boilerplate).

#### Deploying with Docker 🐳

- Execute the following command in-app directory:

```bash
# creates and loads the docker container in detached mode with the required configuration
$ docker-compose up -d
```

- The following command will download dependencies and execute the web application on http://localhost:80 (deployed behind a Nginx reverse proxy).

---

### 🔒 Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the `.env` file.

**APP_ENV** - the application environment to execute as, either in development or production. Determines the type of logging options to utilize. Options: `development` or `production`.

**WEBTOKEN_ENCRYPTION_KEY** - the key to encrypt/decrypt web tokens with. Make sure to generate a random alphanumeric string for this.

**WEBTOKEN_EXPIRATION_TIME** - **the time in seconds** when the web token will expire; by default, it's 2400 seconds which is 40 mins.

**DB_URL** - the connnection string to the MongoDB database.

---

### 🏗 Choosing a Web Framework

This boilerplate comes with [Fastify](https://github.com/fastify/fastify) out of the box as it offers [performance benefits](https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt) over Express. But the Express adapter is still accessible on a [different branch](https://github.com/msanvarov/nest-rest-mongo-boilerplate/tree/express).

---

### 🦾 HTTP/2

Luckily, Fastify can enable HTTP2 over either HTTPS (h2) or plaintext (h2c) out of the box. This boilerplate makes use of this on the [feat/http2 branch](https://github.com/msanvarov/nest-rest-mongo-boilerplate/tree/feat/http2) where a self-signed certificate was created for testing this capability. The certificate is located in the [certs folder](https://github.com/msanvarov/nest-rest-mongo-boilerplate/tree/feat/http2/apps/api/src/assets/certs). **For production, please use a valid certificate.**

The self signed certificate can be generated via OpenSSL:

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout api-key.pem -out api-cert.pem -days 365 -nodes

```

> Remark: Express can be ran with HTTP/2 by employing the [spdy](https://www.npmjs.com/package/spdy) library.

---

### ✅ Testing

#### Docker 🐳

```bash
# Start the docker container if it's not running
$ docker start nest-rest-typeorm-api

# unit tests
$ docker exec -it nest-rest-typeorm-api npm run test

```

#### Non-Docker

```bash
# execute test
$ npm run test
```

---

### 💡 TypeDocs

The documentation for this boilerplate can be found [on Github pages](https://msanvarov.github.io/nest-rest-mongo-boilerplate/).

The docs can be generated on-demand, by typing `npm run typedocs:api:start`. This will produce a **docs/api** folder with the required front-end files and **start hosting on [localhost](http://localhost:8080/)**.

> Remark: The docs for the ui are generated on-demand, by typing `npm run typedocs:ui:start`. This will produce a **docs/ui** folder with the required front-end files and **start hosting on [localhost](http://localhost:8080/)**.

```bash
# generate docs for api code
$ npm run typedocs:api:start
```

---

### 📝 Open API

Out of the box, the web app comes with Swagger; an [open api specification](https://swagger.io/specification/), that is used to describe RESTful APIs. Nest provides a [dedicated module to work with it](https://docs.nestjs.com/openapi/introduction).

The configuration for Swagger can be found at this [location](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/apps/api/src/main.ts).

---

### ✨ TypeORM

TypeORM is an object-relational mapping that acts as an abstraction layer over operations on databases. Please view the [documentation](https://typeorm.io/#/) for further details.

The configuration for TypeORM can be found in the [app module](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/apps/api/src/app.module.ts#L33-L51).

---

### 🔊 Logs

This boilerplate comes with a Winston module for **extensive logging**, the configurations for Winston can be found in the [app module](https://github.com/msanvarov/nest-rest-mongo-boilerplate/blob/master/apps/api/src/app.module.ts#L52-L89).

---

### 🏗️ Progress

|                                                                     Branches | Status |
| ---------------------------------------------------------------------------: | :----- |
|             [main](https://github.com/msanvarov/nest-rest-mongo-boilerplate) | ✅     |
| [feat/\*](https://github.com/msanvarov/nest-rest-mongo-boilerplate/branches) | 🚧     |

<!-- > Remark: This template was employed to create a [Real World example app](https://github.com/gothinkster/realworld) on [Github](). -->

---

### 👥 Support

PRs are appreciated, I fully rely on the passion ❤️ of the OS developers.

---

## License

This starter API is [MIT licensed](LICENSE).

[Author](https://sal-anvarov.tech/)
