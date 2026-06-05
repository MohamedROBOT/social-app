"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthGQL = exports.isAuthenticated = void 0;
const common_1 = require("../common");
const config_1 = require("../config");
const isAuthenticated = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        throw new common_1.BadRequestException("token is required");
    const payload = (0, common_1.verifyToken)(authorization, config_1.JWT_ACCESS_SECRET); //throw error internally from jwt
    req.user = payload;
    next();
};
exports.isAuthenticated = isAuthenticated;
const isAuthGQL = async (context) => {
    const authorization = context.headers.authorization;
    const payload = (0, common_1.verifyToken)(authorization, config_1.JWT_ACCESS_SECRET); //throw error internally from jwt
    context.user = payload;
};
exports.isAuthGQL = isAuthGQL;
