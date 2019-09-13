module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 3,
          allowFirstLine: false
        }
      }
    ],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always']
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
};
