messages
========

## Install

Install dependencies with [Yarn](https://yarnpkg.com/).

```sh
$ yarn
```

You can also use npm.

```sh
$ npm install
```

## Build

```sh
$ npm run build
```

## Start

The project will need to be [built](#build) before you can start the server.

```sh
$ npm start
```

Will read the environment variables `HOST` and `PORT` when starting the API
server. These values default to `127.0.0.1` and `8080` respectively. The server
will then be available at [http://127.0.0.1:8080/](http://127.0.0.1:8080/).

## Test

Code is linted with [TSLint](https://palantir.github.io/tslint/).

Unit tests are run with [AVA](https://github.com/avajs/ava). To test the latest
code changes make sure to [build](#build) the project first.

The test suite will connect to your configured `development` database so make
sure it is [up to date](#update-database) and [seeded](#seed-database) before
running.

```sh
$ npm test
```

## Docs

Documentation is generated with [TypeDoc](http://typedoc.org/).

```sh
$ npm run docs
```

## Database

### Update database

```sh
$ npm run latest
```

### Rollback database update

```sh
$ npm run rollback
```

### Create new migration

```sh
$ npm run make-migration
```

Creates a new migration file in `db/migrations`.

### Seed database

```sh
$ npm run seed
```

## License

MIT.
