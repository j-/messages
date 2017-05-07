messages
========

## Install

Install with yarn.

```sh
$ yarn
```

Otherwise, install with npm.

```sh
$ npm install
```

## Build

```sh
$ npm run build
```

## Start

```sh
$ npm start
```

## Test

Tests are run with [AVA](https://github.com/avajs/ava). To test the latest
changes make sure to build the project first.

The test suite will connect to your configured development database so make sure
it is up to date and seeded before running.

```sh
$ npm test
```

## Docs

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
