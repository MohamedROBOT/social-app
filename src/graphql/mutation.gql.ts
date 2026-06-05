import { GraphQLObjectType } from "graphql";
import { postGQLMutation } from "../modules/post/graphql/post.mutation.gql";

export const mutation = new GraphQLObjectType({
        name: "RootMutation",
        fields: {
            //auth
            //user
            ...postGQLMutation
            //comment
            //request
        }
        // description
    })