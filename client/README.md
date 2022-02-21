# React

- [React](#react)
  - [ESLint configuration](#eslint-configuration)
    - [Install](#install)
    - [Configure](#configure)
    - [Add prettier](#add-prettier)
  - [Testing](#testing)
    - [Structure](#structure)
  - [Run the application](#run-the-application)
  - [Docker configuration (NOT REQUIRED)](#docker-configuration-not-required)
  - [Workflows](#workflows)
    - [Linting](#linting)
    - [Continuous Integration](#continuous-integration)

## ESLint configuration

### Install

```shell
npm install eslint --save-dev
```

### Configure

```shell
npm init @eslint/config
```

### Add prettier

```shell
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

`.eslintrc.json`

```json
{
  "root": true,
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": false
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "quotes": [
      "error",
      "single"
    ],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "singleQuote": true
      }
    ],
    "max-len": [
      "warn",
      120
    ],
    "no-unused-vars": "warn",
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsForRegex": [
          "^draft"
        ]
      }
    ],
    "react/prop-types": 0,
    "jsx-a11y/label-has-associated-control": [
      "warn"
    ]
  }
}
```

> We specify `"root": true` as we want to keep the top level linter separate from the client one.

`.prettierrc.json`

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "colon": false,
  "arrowParens": "always",
  "endOfLine": "auto"
}
```

Run ESLinter

```shell
npx eslint "path/to/folder/**"
```

Reference: [Medium](https://medium.com/how-to-react/config-eslint-and-prettier-in-visual-studio-code-for-react-js-development-97bb2236b31a)

> Make sure to install the following extensions: Prettier, ESLint

## Testing

Run testing

```shell
npm test
```

> Add `--prefix path/to/folder` to specify a path  
> Add `-- --coverage` to run test with coverage

### Structure

- Folder: components must have a `__test__` folder
- File: testing documents must follow the `CompName.test.jsx` format

## Run the application

```shell
npm start
```

> Add `--prefix path/to/folder` to specify a path

## Docker configuration (NOT REQUIRED)

Docker file

```text
FROM node:16.13.0

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start"]

```

Build Docker image

```shell
docker build -t dockerusername/appName:1.0 .
```

Run Docker container

```shell
docker run dockerusername/appName:1.0
```

> Add `-p hostPort:containerPort` to enable port forwarding in the container  
> NOTE: the port needs to be exposed in the Dockerfile!

Stop container by name

```shell
docker stop $(docker ps -q --filter ancestor=dockerusername/appName:1.0 )
```

## Workflows

### Linting

```yml
name: Client Linter

on:
  push:
    branches: [your-branch]
    paths:
    - 'client/src/**'
  workflow_dispatch:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.4.0
      - name: Setup Node
        uses: actions/setup-node@v2.5.1
        with:
          node-version: 16
      - name: Install
        run: npm ci --prefix client/
      - name: Build
        run: CI= npm run build --prefix client/
      - name: Linter
        run: npm run lint --prefix client/
```

### Continuous Integration

```yml
name: Client Tester

on:
  pull_request:
    branches: [master]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.4.0
      - name: Setup Node
        uses: actions/setup-node@v2.5.1
        with:
          node-version: 16
      - name: Install
        run: npm ci --prefix client/
      - name: Test
        run: npm test a --prefix client/ -- --coverage
      - name: Build
        run: CI= npm run build --prefix client/
```
