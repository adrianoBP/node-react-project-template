# node-react-project-template

Template project for React frontend application with NodeJS backend

- [node-react-project-template](#node-react-project-template)
  - [Repository](#repository)
    - [Folder Structure](#folder-structure)
    - [Branches](#branches)
      - [Naming](#naming)
      - [Branch structure](#branch-structure)
    - [Commit Messages](#commit-messages)
  - [Client (React)](#client-react)
    - [React configuration](#react-configuration)
  - [Server (Node)](#server-node)
    - [Linter](#linter)
      - [Install](#install)
      - [Configure](#configure)
      - [Add prettier](#add-prettier)
    - [Required modules](#required-modules)
    - [Host static files](#host-static-files)
    - [Run server](#run-server)
    - [Service](#service)
      - [Create Service](#create-service)
      - [Disable Required authentication](#disable-required-authentication)
      - [Enable Service](#enable-service)
    - [Workflows](#workflows)
      - [Lint](#lint)
      - [Deployment](#deployment)
    - [SSL](#ssl)
      - [Install Apache](#install-apache)
      - [Install Certbot](#install-certbot)
      - [Add domain SSL](#add-domain-ssl)

## Repository

### Folder Structure

```text
├── client
│   ├── .eslintrc.json
│   ├── .prettierrc.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── README.md
├── controllers
│   ├── index.js
│   └── sample.js
│── .eslintrc.json
│── .eslintignore
│── .prettierrc.json
├── package-lock.json
├── package.json
├── server.js
├── LICENSE
└── README.md
```

### Branches

#### Naming

- `feat/be-33`: feature branch for backend card number 33
- `fix/fe-12`: fix branch for frontend card 12

#### Branch structure

```text
main
├─ develop
│  ├ feat
│  └ fix
└─ release
```

- `main`: main repository branch. All tests must be successful in this branch
- `develop`: development branch - All features and fixes branches will be created from this branch. Can, but shouldn't, contain bugs.
- `release`: **must** contain bug-free code. **All** tests must be successful. Code used by the deployed server.

### Commit Messages

Rules:

- Do **not** use pronouns and verbs such as "I have edited [...]"
- Do **not** use swear words
- Be descriptive and **concise**
- Use present verbs
- Between 20 and 80 characters
- Small, many and precise commits

Samples:

- `fix(TodoList): fix button click to allow`
- `feat(Controller): add testing controller endpoint`
- `style(TodoItem): change button colour`

## Client (React)

```shell
npx create-react-app client
```

- `npx` executes a file
- `client` is the name of the folder to use (use `.` to use the current folder)

### React configuration

[Go To React configuration](./client/README.md)

## Server (Node)

### Linter

#### Install

```shell
npm install eslint --save-dev
```

#### Configure

```shell
npm init @eslint/config
```

#### Add prettier

```shell
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

`.eslintrc.json`

```json
{
  "root": true,
  "extends": [
      "airbnb",
      "prettier",
      "plugin:prettier/recommended"
  ],
  "env": {
      "browser": true,
      "commonjs": true,
      "es2021": true,
      "node": true
  },
  "parserOptions": {
      "ecmaVersion": "latest"
  },
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
      "no-unused-vars": "warn"
  }
}
```

`.eslintignore`

```text
node_modules/
build/
```

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

### Required modules

```shell
npm install detenv express body-parser
```

### Host static files

```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexControllers = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: false }));

const clientBuildPath = path.join(__dirname, './client/build')

app.use('/api', indexControllers);

app.use(express.static(clientBuildPath));
app.get('*', (_, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
```

### Run server

```shell
npm start
```

### Service

#### Create Service

```shell
sudo nano /etc/systemd/system/service-name.service
```

```text
[Unit]
Description=Node React Template service
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/path/to/application/
Restart=always
ExecStart=npm start

[Install]
WantedBy=multi-user.target
```

#### Disable Required authentication

1. Edit `/usr/share/polkit-1/actions/org.freedesktop.systemd1.policy`
2. Set `org.freedesktop.systemd1.manage-units` > `allow_any` to `yes`
3. Set `org.freedesktop.systemd1.manage-units-files` > `allow_any` to `yes`
4. Set `org.freedesktop.systemd1.reload-daemon` > `allow_any` to `yes`

```shell
sudo systemctl restart polkit
```

#### Enable Service

```shell
systemctl daemon-reload
```

```shell
systemctl enable service-name
```

```shell
systemctl start service-name
```

### Workflows

#### Lint

```yml
name: Server Linter

on:
  push:
    branches: [your-branch]
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
        run: npm ci
      - name: Build
        run: CI= npm run build
      - name: Linter
        run: npm run lint
```

#### Deployment

> Setup `SSH_PASSWORD` environment variable in GitHub Project > Settings > Actions > New repository secret

```yml
name: Deploy

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: host.name
          username: username
          password: ${{ secrets.ssh_password }}
          port: 22
          script: |
            cd /path/to/your/project
            systemctl stop service-name
            git checkout release
            git pull
            npm run build --prefix client/
            systemctl start service-name
```

### SSL

#### Install Apache

```shell
sudo apt install apache2
```

#### Install Certbot

```shell
apt install certbot python3-certbot-apache
```

#### Add domain SSL

[Link (private repo)](https://github.com/adrianoBP/docs/blob/master/Apache/SSL.md)
