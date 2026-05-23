"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentGQLQuery = void 0;
const comment_type_gql_1 = require("./comment.type.gql");
const comment_service_1 = __importDefault(require("../comment.service"));
const mongoose_1 = require("mongoose");
exports.commentGQLQuery = {
    comment: {
        type: comment_type_gql_1.commentGQLType,
        resolve: async () => {
            return await comment_service_1.default.getOne(new mongoose_1.Types.ObjectId("6a120223446fca182b49ab0b"));
        }
    }
};
