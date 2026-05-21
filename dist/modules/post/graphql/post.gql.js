"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMutation = exports.postQuery = void 0;
const post_type_1 = require("./post.type");
const post_service_1 = require("./post.service");
exports.postQuery = {
    post: {
        type: post_type_1.PostType, resolve: post_service_1.getPost
    }
};
exports.postMutation = {};
// export const postSubscription = {}
