# Podcast Client Web

## Linting

- Run `yarn lint` to check for errors
- Run `yarn lint:fix` to check and autofix errors

### VSCode (optional)

- Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
- Add this to your settings, so ESLint runs automatically:

```json
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ]
```
