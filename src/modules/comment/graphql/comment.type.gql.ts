import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql/type";
import { userGQLType } from "../../user/graphql/user.gql.type";
import { PostGQLType } from "../../post/graphql/post.type.gql";

export const commentGQLType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
    user: {
      type: userGQLType,
      resolve: (parent: any) => {
        //populate in comment service
        return parent.userId;
      },
    },
    post: {
      type: PostGQLType,
      resolve: (parent: any) => {
        return parent.postId;
      },
    },
    content: { type: GraphQLString },
    attachment: {
      type: GraphQLString,
    },
    mentions: {
      type: new GraphQLList(userGQLType),
    },
  },
});
