import {GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLString} from "graphql/type";

export const PostType = new GraphQLObjectType({
    name: "PostQuery",
    fields: {
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        price: {type:GraphQLFloat},
        category: {type:GraphQLString},
        brand: {type:GraphQLString},
        discount: {type:GraphQLFloat}
    }
})