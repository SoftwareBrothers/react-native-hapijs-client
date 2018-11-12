module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest",
    ],
    "globals": {
        "process": true
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/destructuring-assignment": [
            "error",
            "never"
        ],
    },
    "overrides": [
        {
          "files": ["*-test.js","*.spec.js"],
          "rules": {
            "no-unused-expressions": "off",
            "func-names": "off",
            "prefer-arrow-callback": "off"
          }
        }
    ],
    "settings": {
        "react": {
          "version": "16.0"
        }
    }
};