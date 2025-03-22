// Ensure TextEncoder is available (Fix for "TextEncoder is not defined" issue)
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Jest Configuration Workaround (since CRA does not support package.json Jest settings)
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
