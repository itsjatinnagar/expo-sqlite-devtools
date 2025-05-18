const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("js"); // <--- add this
config.resetCache = true;
module.exports = config;
