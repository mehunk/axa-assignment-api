# AXA Assignment APi


## Installation

```bash
$ npm install
```

## Before running the app

Before running the app, you need to create a .env file in the root directory of the project and add the following variables:

| Key               | Example Value |
| ----------------- | ------------- |
| DATABASE_HOST     | localhost     |
| DATABASE_PORT     | 3306          |
| DATABASE_USER     | root          |
| DATABASE_PASSWORD | 123456        |
| DATABASE_NAME     | axa-insurance |

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
