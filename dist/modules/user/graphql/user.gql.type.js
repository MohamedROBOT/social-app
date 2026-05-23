"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGQLType = void 0;
const type_1 = require("graphql/type");
exports.userGQLType = new type_1.GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: type_1.GraphQLID },
        userName: {
            type: type_1.GraphQLString
        },
        email: { type: type_1.GraphQLString },
        phoneNumber: { type: type_1.GraphQLString },
        password: { type: type_1.GraphQLString },
        role: { type: type_1.GraphQLInt },
        provider: { type: type_1.GraphQLInt },
        gender: { type: type_1.GraphQLInt },
        profilePic: { type: type_1.GraphQLString }
    }
});
