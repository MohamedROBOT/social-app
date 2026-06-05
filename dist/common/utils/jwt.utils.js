"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const node_crypto_1 = __importDefault(require("node:crypto"));
const config_1 = require("../../config");
const error_utils_1 = require("./error.utils");
const signToken = (payload, secret, options) => {
    payload.jti = node_crypto_1.default.randomUUID();
    return (0, jsonwebtoken_1.sign)(payload, secret, options);
};
const generateTokens = (payload) => {
    const accessToken = signToken(payload, config_1.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
    });
    const refreshToken = signToken(payload, config_1.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
    return {
        tokens: {
            accessToken,
            refreshToken,
        },
    };
};
exports.generateTokens = generateTokens;
const verifyToken = (authorization, secret) => {
    const token = authorization.split(" ")[1];
    if (!token)
        throw new error_utils_1.BadRequestException("Token is required");
    return (0, jsonwebtoken_1.verify)(token, secret);
};
exports.verifyToken = verifyToken;
