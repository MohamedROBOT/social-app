"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGQLQuery = void 0;
const post_type_gql_1 = require("./post.type.gql");
const post_service_1 = __importDefault(require("../post.service"));
const graphql_1 = require("graphql");
exports.postGQLQuery = {
    post: {
        type: post_type_gql_1.PostGQLType,
        args: { id: { type: graphql_1.GraphQLID } },
        resolve: async (parent, args) => {
            return await post_service_1.default.get(args.id);
        },
    },
};
