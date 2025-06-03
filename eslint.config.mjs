// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // {
  //   rules: {
  //     '@typescript-eslint/no-unused-vars': [
  //       'error',
  //       {
  //         argsIgnorePattern: '^_',
  //         varsIgnorePattern: '^_',
  //         caughtErrorsIgnorePattern: '^_',
  //       },
  //     ],
  //   },
  // },
];
