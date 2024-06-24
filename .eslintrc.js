module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: ["error", 2],
        "linebreak-style": ["error", "CRLF"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "none",
                ignoreRestSiblings: false,
            },
        ],
    },
};
