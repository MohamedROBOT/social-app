"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.IUser = void 0;
const type_1 = require("graphql/type");
exports.IUser = {
    _id: { type: type_1.GraphQLID },
    userName: { type: type_1.GraphQLString },
    email: { type: type_1.GraphQLString },
    password: { type: type_1.GraphQLString },
    phoneNumber: {
        type: type_1.GraphQLString
    }
};
exports.UserType = new type_1.GraphQLObjectType({
    name: "UserQuery",
    fields: exports.IUser
});
