module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Add this line
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['eslint-comments', 'react-refresh', 'prettier', '@typescript-eslint'],
    rules: {
        'eslint-comments/no-unused-disable': 'off',
        '@eslint-community/eslint-comments/no-unused-disable': 'off',
        'eslint-comments/no-unused-disable': 'off',
        'no-unused-disable': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-explicit-any': 'warn',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        'max-len': [
            'error',
            {
                code: 1500,
                tabWidth: 2,
                ignoreComments: true,
                ignoreUrls: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
            },
        ],
    },
};
