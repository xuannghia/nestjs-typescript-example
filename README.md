<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>
    
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn prod
```

## Migration

```bash
# create empty migration
$ yarn migration:create migration-name

# auto create migration
$ yarn migration:generate migration-name

# apply migrations
$ yarn migration:run

# revert migration
$ yarn migration:revert
```

## Features

- Swagger API documentation
- Authenticated with JWT by default
- Using simple Attribute-based Access Control (ABAC)

### Swagger API documentation

This project using `@nestjs/swagger`. Go to [http://localhost:8000/docs](http://localhost:8000/docs) to access Swagger UI.
 
Read more at [https://github.com/nestjs/swagger](https://github.com/nestjs/swagger).

### Authentication/Authorization

#### `@Public()` 

All routes in this project will be authentication required by default. To public any route, using `@Public()` decorator.

```typescript
// This route will be public. Everyone can access this route
@Controller('something')
export class ExampleController {
  @Get()
  @Public()
  publicRoute() {
    return 'Hello!'
  }
}
```

#### `@AccessControl()`

This project using ABAC to control access. `@AccessControl()` will check user role before access to route.

```typescript
// This route will be protected. Anyone have 'user:view:any' permission can access this route
@Controller('something')
export class ExampleController {
  @Get()
  @AccessControl({
    resource: 'user',
    action: 'view',
    possession: 'any'
  })
  protectedRoute() {
    return 'Hello'
  }
}
```

Database will be like following tables:

| users |||
|-------------|--------------|----------------------------|
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| username    | varchar(255) |                            |
| password    | varchar(255) |                            |
| salt        | varchar(255) |                            |
| email       | varchar(255) |                            |
| ...         | ...          |                            |


| roles |||
|-------------|--------------|----------------------------|
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| key         | varchar(255) |                            |
| name        | varchar(255) |                            |
| description | varchar(255) |                            |


| users_roles_roles |||
|-------------|--------------|----------------------------|
| userId      | int(11)      | PRIMARY KEY FOREIGN KEY    |
| roleId      | int(11)      | PRIMARY KEY FOREIGN KEY    |


| roles-permissions |||
|-------------|--------------|----------------------------|
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| role        | int(11)      | FOREIGN KEY                |
| permission  | varchar(255) |                            |
| description | varchar(255) |                            |


## License

  Nest is [MIT licensed](LICENSE).
