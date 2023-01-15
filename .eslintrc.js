/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module'
  },
  // 继承配置
  extends: [
    '@shoppingzh'
  ],
  rules: {
    'array-bracket-newline': [0],
  }
}
