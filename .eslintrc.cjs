module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['tailwind.config.js', 'postcss.config.js'],
  rules: {
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
  },
};
