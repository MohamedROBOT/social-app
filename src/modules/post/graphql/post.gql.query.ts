import { PostGQLType } from "./post.type.gql";
import { postService } from "../../../common/DI/services";
import { Types } from "mongoose";
import { GraphQLID } from "graphql";

export const postGQLQuery = {
  post: {
    type: PostGQLType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent: any, args: { id: any }) => {
      return await postService.get(args.id);
    },
  },
};
