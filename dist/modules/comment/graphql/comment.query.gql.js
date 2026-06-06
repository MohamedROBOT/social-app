"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentGQLQuery = void 0;
const comment_type_gql_1 = require("./comment.type.gql");
const services_1 = require("../../../common/DI/services");
const mongoose_1 = require("mongoose");
exports.commentGQLQuery = {
    comment: {
        type: comment_type_gql_1.commentGQLType,
        resolve: async () => {
            return await services_1.commentService.getOne(new mongoose_1.Types.ObjectId("6a120223446fca182b49ab0b"));
        },
    },
};
