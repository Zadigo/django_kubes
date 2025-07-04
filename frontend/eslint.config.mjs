import globals from 'globals'
import eslint from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '**/*.d.ts',
    '**/coverage/**',
    '**/dist/**',
    '**/src/components/volt/**',
    '**/src/components/ui/**'
  ]),

  ...typescriptEslint.config(
    {
      ignores: ['*.d.ts', '**/coverage', '**/dist']
    },
    {
      plugins: {
        '@stylistic': stylistic,
      },
      extends: [
        stylistic.configs.recommended,
        eslint.configs.recommended,
        ...typescriptEslint.configs.recommended,
        ...eslintPluginVue.configs['flat/recommended'],
      ],
      files: ['**/*.{ts,vue}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.node
        },
        parserOptions: {
          parser: typescriptEslint.parser,
          projectService: true,
          extraFileExtensions: ['.vue']
        }
      },
      rules: {
        'vue/max-attributes-per-line': ['error', {
          'singleline': {
            "max": 20
          },
          'multiline': {
            "max": 1
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

        '@stylistic/comma-dangle': ['warn', 'never'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/no-confusing-arrow': ['warn'],
        '@stylistic/switch-colon-spacing': [
          'error', { 'after': true, 'before': false }
        ]
      }
    }
  )
])
