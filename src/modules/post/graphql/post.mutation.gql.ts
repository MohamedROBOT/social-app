import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import postService from "../post.service";
import { PostGQLType } from "./post.type.gql";
import { IPost } from "../../../common";
import { CreatePostDTO } from "../post.dto";
import { Types } from "mongoose";
import type { Request } from "express";
import { isAuthGQL, isValidGQL } from "../../../middleware";
import { createPostSchema } from "../post.validation";

export const postGQLMutation = {
  addPost: {
    type: PostGQLType,
    args: {
      content: { type: GraphQLString },
      attachments: { type: new GraphQLList(GraphQLString) },
    },

    //3 positional arguments (parent, args, context)
    resolve: async (_: any, args: CreatePostDTO, context: Request) => {
      await isAuthGQL(context);
      await isValidGQL(createPostSchema, args);
      return await postService.create(
        args,
        new Types.ObjectId(context.user._id),
      );
    },
  },
  updatePost: {
    type: PostGQLType,
    args: {
      content: { type: GraphQLString },
      attachments: { type: new GraphQLList(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      postId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (
      _: any,
      args: CreatePostDTO & { userId: Types.ObjectId; postId: Types.ObjectId },
    ) => {
      return await postService.update(args, args.postId);
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: {
      postId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_: any, args: { postId: Types.ObjectId }, context: any) => {
      isAuthGQL(context);
      const { deletedCount } = await postService.delete(args.postId);
      return !!deletedCount;
    },
  },
};
