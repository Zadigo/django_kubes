import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import autoImportGlobals from './.eslintrc-auto-import.json'

import { defineConfig } from 'eslint/config'


export default defineConfig([
  {
    name: 'Files Globally',
    ignores: [
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.stories.ts',
      '**/*.setup.ts',
      '**/*.config.ts',
      '**/components/volt/**'
    ],
    rules: {
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-confusing-arrow': ['warn'],
      '@stylistic/switch-colon-spacing': [
        'error', {
          after: true,
          before: false
        }
      ],
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals
      },
      parserOptions: {
        projectService: true,
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 20
        },
        multiline: {
          max: 1
        }
      }],

      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/related-getter-setter-pairs': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
      '@typescript-eslint/no-misused-spread': 'warn',
      '@typescript-eslint/no-extraneous-class': 'warn',
    }
  },
  stylistic.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylistic,
  pluginVue.configs['flat/strongly-recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  }
])
