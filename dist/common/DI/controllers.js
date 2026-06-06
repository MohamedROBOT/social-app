"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const container_1 = require("./container");
const tokens_1 = require("./tokens");
exports.commentRepository = container_1.container.resolve(tokens_1.TOKENS.CommentRepository);
