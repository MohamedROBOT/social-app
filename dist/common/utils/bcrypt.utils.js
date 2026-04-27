"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
//dependency injection
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 *
 * @param password plain text
 * @returns hashed password
 */
const hash = async (password) => {
    return bcrypt_1.default.hash(password, 12);
};
exports.hash = hash;
/**
 *
 * @param password which comes from frontend
 * @param hashedPassword which comes from db
 * @returns promise of boolean
 */
const compare = async (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.compare = compare;
