<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) based example of API.

Ports in use: **9000**, **9001**, **27037**.

Microservice `gateway` contains only ts code. It works on **9000** port, so check if the port is not in use on your machine.

Microservice `users` contains Mongo DB in docker image and ts code which works on **9001** port. Mongo DB especially runs on **27037** instead of standard 27017 port. This is to avoid conflict with your current project with Mongo in case you have one. 

## Installation

In each microservice (`gateway` and `users` folders) rename `.env.example` to `.env`. To run gateway:

```bash
# gateway
$ cd gateway
$ npm install
$ npm run start:dev
```

To run `users`:

```bash
# users
$ cd users
$ npm install
$ npm run start:dev
$ npm run db:up
```


## Running Mongo DB in docker for users microservice

```bash
# up image with mongo DB
$ npm run db:up

# stop image
$ npm run db:stop

# fully remove image
$ npm run db:stop
```

## How to test endpoints from Postman

In Postman: `File` -> `Import...` and choose file `nest_basics.postman_collection.json`. At first run request `Create User`.
Copy from response field `data.user._id` and paste it into Params `_id` of request `Get User by Id`. Then run request `Get User by Id`.

## License

The boilerplate is [MIT licensed](LICENSE).
