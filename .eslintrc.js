// .eslintrc.js
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2022, // ES2022 기능 지원
    sourceType: 'module',
  },
  extends: [
    // 'airbnb-base',
    'eslint:recommended',
    'plugin:prettier/recommended', // Prettier 관련 규칙 추가
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'warn', // 사용하지 않는 변수 : warn 경고 || off 끄기
  },
};
