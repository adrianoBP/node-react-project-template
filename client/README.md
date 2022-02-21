# React

- [React](#react)
  - [ESLint configuration](#eslint-configuration)
  - [Testing](#testing)
    - [Structure](#structure)
  - [Run the application](#run-the-application)
  - [Docker configuration (NOT REQUIRED)](#docker-configuration-not-required)
  - [Workflows](#workflows)
    - [Linting](#linting)
    - [Continuous Integration](#continuous-integration)

## ESLint configuration

Install ESLinter:

```shell
npm install -g eslint
```

Configure ESLinter with Prettier

```shell
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

ESLinter settings rules (`.eslintrc.json`)

```json
{
  "jsx-a11y/label-has-associated-control": [
    "warn"
  ],
  "max-len": [
    "warn",
    130
  ],
  "no-param-reassign": [
    "error",
    {
      "props": true,
      "ignorePropertyModificationsForRegex": [
        "^draft"
      ]
    }
  ],
  "no-unused-vars": "warn",
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto",
      "singleQuote": true
    }
  ],
  "quotes": [
    "error",
    "single"
  ],
  "react/prop-types": 0
}
```

Prettier settings (`.prettierrc.json`)

```json
{
  "arrowParens": "always",
  "colon": false,
  "endOfLine": "auto",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
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
    branches: [fake-branch]
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
        run: npx eslint "client/src/**"
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
