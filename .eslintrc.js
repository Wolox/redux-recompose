module.exports = {
    "extends": "airbnb-base",
    "env": {
      "jest": true
    },
    "rules": {
      "comma-dangle": ["error", "never"],
      "no-console": ["error", {"allow": ["warn", "error"]}],
      "arrow-parens": ["off", { "requireForBlockBody": false }],
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
      "max-len": "off"
    }
};
