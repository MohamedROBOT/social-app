"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutation = exports.userQuery = void 0;
const user_type_1 = require("./user.type");
const user_service_1 = require("./user.service");
exports.userQuery = {
    user: {
        type: user_type_1.UserType, resolve: user_service_1.getUser
    }
};
exports.userMutation = {
    createUser: {
        type: user_type_1.UserType,
        args: user_type_1.IUser,
        resolve: user_service_1.createUser
    }
};
// export const userSubscription = {}
