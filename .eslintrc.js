/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    '@shoppingzh',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'array-bracket-newline': [0],
    '@typescript-eslint/no-var-requires': [0],
  }
}
