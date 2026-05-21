"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostType = void 0;
const type_1 = require("graphql/type");
exports.PostType = new type_1.GraphQLObjectType({
    name: "PostQuery",
    fields: {
        id: { type: type_1.GraphQLID },
        name: { type: type_1.GraphQLString },
        price: { type: type_1.GraphQLFloat },
        category: { type: type_1.GraphQLString },
        brand: { type: type_1.GraphQLString },
        discount: { type: type_1.GraphQLFloat }
    }
});
