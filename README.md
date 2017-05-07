messages
========

> Notification message pipeline

[![Build Status][travis-svg]][travis-link]

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

The project is built in [TypeScript](https://www.typescriptlang.org/).

```sh
$ npm run build
```

Build output will be available in `dist/`.

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

Docs output will be available in `docs/`.

## Database

Databases are provisioned with [Knex](http://knexjs.org/). Environments are
configured in [`db/knexfile.js`](db/knexfile.js). There are two environments
set up:

* `development` (default)

  A simple [SQLite](https://www.sqlite.org/) database for easy development and
  testing.

* `production`

  A [PostgreSQL](https://www.postgresql.org/) database that is configured via
  the `CONNECTION_STRING` environment variable.

To connect to a production database you will need to run the following commands
with the `NODE_ENV` environment variable set to `production`.

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

[MIT](LICENSE).

[travis-svg]: https://travis-ci.org/j-/messages.svg
[travis-link]: https://travis-ci.org/j-/messages
