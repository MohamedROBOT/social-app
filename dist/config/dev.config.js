"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_REDIS = exports.MAIL_PASSWORD = exports.MAIL_EMAIL = exports.ENCRYPTION_SECRET = exports.JWT_SECRET = exports.DB_URL = void 0;
exports.DB_URL = process.env.DB_URL;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
exports.MAIL_EMAIL = process.env.GOOGLE_EMAIL;
exports.MAIL_PASSWORD = process.env.GOOGLE_PASSWORD;
exports.DB_REDIS = process.env.DB_REDIS;
