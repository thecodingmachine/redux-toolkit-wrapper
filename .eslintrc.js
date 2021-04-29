module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "ignorePatterns": ["lib/*"],
    "rules": {
        semi: ['error', 'never'],
        "comma-dangle": ["error", "always-multiline"],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
    },
}
