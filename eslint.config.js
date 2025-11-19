// eslint.config.mjs
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: [
        ".next/**",
        "node_modules/**",
        "dist/**",
        "coverage/**",
        "postcss.config.js"
      ],
  },
  js.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
];
