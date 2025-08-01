import { defineConfig, globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';

export default defineConfig([
  pluginJs.configs.recommended,
  globalIgnores(['dist/*', 'docs/*']),
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      complexity: ['error', { max: 7 }],
    },
  },
]);
