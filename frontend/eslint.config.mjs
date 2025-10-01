import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import autoImportGlobals from './.eslintrc-auto-import.json' with { type: 'json' }

import { defineConfig } from 'eslint/config'

// https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser

export default defineConfig([
  stylistic.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals
      }
    },
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
  }

  // globalIgnores([
  //   '**/*.spec.ts',
  //   '**/*.test.ts',
  //   '**/*.stories.ts',
  //   '**/*.setup.ts',
  //   '**/*.config.ts',
  //   '**/components/volt/**'
  // ]),
  // {
  //   // files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
  //   files: ['**/*.{js,ts,vue}'],
  //   plugins: { js },
  //   extends: ['js/recommended'],
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...autoImportGlobals.globals
  //     },
  //     parserOptions: {
  //       projectService: true,
  //       // project: './tsconfig.json',
  //       tsconfigRootDir: import.meta.dirname,
  //       extraFileExtensions: ['.vue']
  //     }
  //   }
  // },
  // stylistic.configs.recommended,
  // tseslint.configs.recommended,
  // pluginVue.configs['flat/strongly-recommended'],
  // {
  //   rules: {
  //     'vue/max-attributes-per-line': ['error', {
  //       singleline: {
  //         max: 20
  //       },
  //       multiline: {
  //         max: 1
  //       }
  //     }],

  //     '@stylistic/comma-dangle': ['warn', 'never'],
  //     '@stylistic/brace-style': ['error', '1tbs'],
  //     '@stylistic/no-confusing-arrow': ['warn'],
  //     '@stylistic/switch-colon-spacing': [
  //       'error', {
  //         after: true,
  //         before: false
  //       }
  //     ],

  //     '@typescript-eslint/no-unsafe-argument': 'warn',
  //     '@typescript-eslint/unified-signatures': 'error',
  //     '@typescript-eslint/related-getter-setter-pairs': 'warn',
  //     '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
  //     '@typescript-eslint/no-unnecessary-template-expression': 'warn',
  //     '@typescript-eslint/no-unnecessary-condition': 'warn',
  //     '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
  //     '@typescript-eslint/no-non-null-assertion': 'warn',
  //     '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
  //     '@typescript-eslint/no-misused-spread': 'warn',
  //     '@typescript-eslint/no-extraneous-class': 'warn'
  //   }
  // },
  // {
  //   files: ['**/*.vue'],
  //   languageOptions: {
  //     parserOptions: {
  //       parser: tseslint.parser
  //     }
  //   }
  // }
])
