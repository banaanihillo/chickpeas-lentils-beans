module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
      "semi": [
        "error",
        "never"
      ],
      "no-trailing-spaces": "error",
      "arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "no-console": 0
    }
}
