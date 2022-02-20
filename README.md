# node-react-project-template

Template project for React frontend application with NodeJS backend

## How to start: React

### 1. Create React application

```sh
npx create-react-app client
```

- `npx` executes a file
- `client` is the name of the folder to use (use `.` to use the current folder)

### 2. Start the app

```sh
npm start
```

> Add `--prefix path/to/folder` to specify a path

### 3. ESLint

Install ESLinter:

```sh
npm install -g eslint
```

Configure ESLinter with Prettier

```sh
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-de
```

ESLinter settings (`.eslintrc.json`)

```json
{
    "quotes": [
        "error",
        "single"
    ],
    "prettier/prettier": [
        "error",
        {
            "singleQuote": true
        }
    ]
}
```

Prettier settings (`.prettierrc.json`)

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "colon": false,
  "arrowParens": "always"
}
```

Run ESLinter

```sh
npx eslint "path/to/folder/**"
```

Reference: [Medium](https://medium.com/how-to-react/config-eslint-and-prettier-in-visual-studio-code-for-react-js-development-97bb2236b31a)

> Make sure to install the following extensions: Prettier, ESLint
