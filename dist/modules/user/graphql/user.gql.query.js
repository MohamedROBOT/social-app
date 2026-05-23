"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGQLQuery = void 0;
const user_gql_type_1 = require("./user.gql.type");
const user_service_1 = __importDefault(require("../user.service"));
const mongoose_1 = require("mongoose");
exports.userGQLQuery = {
    user: {
        type: user_gql_type_1.userGQLType,
        resolve: async () => {
            return await user_service_1.default.profile(new mongoose_1.Types.ObjectId("69dfad1d0be24b44e159fa94"));
        }
    }
};
