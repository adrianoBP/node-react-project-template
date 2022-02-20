# Start the app

```shell
npm start
```

> Add `--prefix path/to/folder` to specify a path

## ESLint

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
