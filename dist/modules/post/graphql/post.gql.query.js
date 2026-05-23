"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGQLQuery = void 0;
const post_gql_type_1 = require("./post.gql.type");
const post_service_1 = __importDefault(require("../post.service"));
const mongoose_1 = require("mongoose");
exports.postGQLQuery = {
    post: {
        type: post_gql_type_1.postGQLType,
        resolve: async () => {
            return await post_service_1.default.getPost(new mongoose_1.Types.ObjectId("69e4abe10f47a1294fb86758"));
        }
    }
};
