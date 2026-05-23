import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql/type";

export const userGQLType = new GraphQLObjectType({
    name:"UserType",
    fields: {
        _id: {type: GraphQLID},
        userName: {
            type: GraphQLString
        },
        email: {type: GraphQLString},
        phoneNumber: {type: GraphQLString},
        password: {type: GraphQLString},
        role: {type: GraphQLInt},
        provider: {type: GraphQLInt},
        gender: {type: GraphQLInt},
        profilePic: {type: GraphQLString}
    }
})