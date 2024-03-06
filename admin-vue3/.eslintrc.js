module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      // 自定义规则
      'semi': ['error', 'always'], // 强制要求分号
    },
  };  