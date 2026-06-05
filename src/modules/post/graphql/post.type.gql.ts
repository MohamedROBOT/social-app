import {GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql/type";
import {userGQLType} from "../../user/graphql/user.gql.type";

export const PostGQLType = new GraphQLObjectType({
    name: "PostType",
    fields: {
        _id: {type: GraphQLID},
        content: {type: GraphQLString},
        attachments: {type: new GraphQLList(GraphQLString)},
        reactionCount: {type: GraphQLInt},
        commentsCount: {type: GraphQLInt},
        sharesCount: {type: GraphQLInt},
        user: {type: userGQLType, resolve: (parent: any)=>{
            return parent.userId
            }}
    }
})