module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/standard'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    'object-curly-newline': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        exceptions: [''],
      },
    ],
    'no-param-reassign': 'off',
    'no-return-await': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-indent': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@pages', './pages'],
          ['@components', './src/components'],
          ['@modules', './src/modules'],
          ['@models', './src/models'],
          ['@utils', './src/utils'],
          ['@resources', './resources'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
}
