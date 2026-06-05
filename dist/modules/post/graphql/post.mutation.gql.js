"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGQLMutation = void 0;
const graphql_1 = require("graphql");
const post_service_1 = __importDefault(require("../post.service"));
const post_type_gql_1 = require("./post.type.gql");
const mongoose_1 = require("mongoose");
const middleware_1 = require("../../../middleware");
const post_validation_1 = require("../post.validation");
exports.postGQLMutation = {
    addPost: {
        type: post_type_gql_1.PostGQLType,
        args: {
            content: { type: graphql_1.GraphQLString },
            attachments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        },
        //3 positional arguments (parent, args, context)
        resolve: async (_, args, context) => {
            await (0, middleware_1.isAuthGQL)(context);
            await (0, middleware_1.isValidGQL)(post_validation_1.createPostSchema, args);
            return await post_service_1.default.create(args, new mongoose_1.Types.ObjectId(context.user._id));
        },
    },
    updatePost: {
        type: post_type_gql_1.PostGQLType,
        args: {
            content: { type: graphql_1.GraphQLString },
            attachments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            postId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        },
        resolve: async (_, args) => {
            return await post_service_1.default.update(args, args.postId);
        },
    },
    deletePost: {
        type: graphql_1.GraphQLBoolean,
        args: {
            postId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        },
        resolve: async (_, args, context) => {
            (0, middleware_1.isAuthGQL)(context);
            const { deletedCount } = await post_service_1.default.delete(args.postId);
            return !!deletedCount;
        },
    },
};
