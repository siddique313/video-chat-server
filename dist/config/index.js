"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.CORS_ORIGIN = exports.PORT = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.PORT = process.env.PORT || 8080;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_PORT = parseInt(process.env.DB_PORT) || 5432;
exports.DB_USERNAME = process.env.DB_USERNAME || 'postgres';
exports.DB_PASSWORD = process.env.DB_PASSWORD || 'password';
exports.DB_NAME = process.env.DB_NAME || 'videochat';
//# sourceMappingURL=index.js.map