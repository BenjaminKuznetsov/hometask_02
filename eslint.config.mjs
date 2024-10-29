import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [{ files: ['**/*.{js,mjs,cjs,ts}'] }, {
  languageOptions: {
    globals: globals.browser,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
  },
},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
