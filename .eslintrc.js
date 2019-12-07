module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'never'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
