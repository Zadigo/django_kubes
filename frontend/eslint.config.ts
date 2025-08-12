import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint, { type Config } from 'typescript-eslint'
import autoImportGlobals from './.eslintrc-auto-import.json'

import { defineConfig, globalIgnores } from 'eslint/config'

// https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser

export default defineConfig([
  globalIgnores([
    '**/*.spec.ts',
    '**/*.test.ts',
    '**/*.stories.ts',
    '**/*.setup.ts',
    '**/*.config.ts',
    '**/components/volt/**'
  ]),
  {
    name: 'Files Globally',
    rules: {
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/no-confusing-arrow': ['warn'],
      '@stylistic/switch-colon-spacing': [
        'error', {
          after: true,
          before: false
        }
      ]
    }
  },
  {
    // files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    files: ['**/*.{js,ts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals
      },
      parserOptions: {
        projectService: true,
        // project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue']
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

      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/related-getter-setter-pairs': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
      '@typescript-eslint/no-misused-spread': 'warn',
      '@typescript-eslint/no-extraneous-class': 'warn'
    }
  },
  stylistic.configs.recommended,
  tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts']
  })),
  tseslint.configs.stylistic.map((config) => ({
    ...config,
    files: ['**/*.ts']
  }),
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
