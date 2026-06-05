import { GraphQLObjectType } from "graphql";
import { commentGQLQuery } from "../modules/comment/graphql/comment.query.gql";
import { postGQLQuery } from "../modules/post/graphql/post.gql.query";
import { userGQLQuery } from "../modules/user/graphql/user.gql.query";

  export const query = new GraphQLObjectType({
        name: "RootQuery",
        fields: {
            //auth
            ...userGQLQuery,
            ...postGQLQuery,

            ...commentGQLQuery
            //request
        }
        // description
    })