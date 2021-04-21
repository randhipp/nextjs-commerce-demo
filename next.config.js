const transpileModules = require("next-transpile-modules")

const withTM = transpileModules(["ky"])

module.exports = withTM()