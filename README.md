# node-react-project-template

Template project for React frontend application with NodeJS backend

- [node-react-project-template](#node-react-project-template)
  - [Repository](#repository)
    - [Folder Structure](#folder-structure)
  - [Client](#client)
  - [Server](#server)
    - [Linter](#linter)
    - [Required modules](#required-modules)
    - [Host static files](#host-static-files)
    - [Service](#service)
      - [Create Service](#create-service)
      - [Disable Required authentication](#disable-required-authentication)
      - [Enable Service](#enable-service)
    - [Workflows](#workflows)
      - [Deployment](#deployment)

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
├── package-lock.json
├── package.json
├── server.js
├── LICENSE
└── README.md
```

## Client

```shell
npx create-react-app client
```

- `npx` executes a file
- `client` is the name of the folder to use (use `.` to use the current folder)

[Go To React configuration](./client/README.md)

## Server

### Linter

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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: false }));

const clientBuildPath = path.join(__dirname, './client/build')

app.use(express.static(clientBuildPath));
app.get('*', (_, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
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
          host: t1.adrianobp.dev
          username: adriano
          password: ${{ secrets.ssh_password }}
          port: 22
          script: |
            cd /home/adriano/projects/node-react-project-template
            systemctl stop node-react-template
            git checkout master
            git pull
            npm run build --prefix client/
            systemctl start node-react-template
```
