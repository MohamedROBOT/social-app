"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGQLQuery = void 0;
const user_gql_type_1 = require("./user.gql.type");
const mongoose_1 = require("mongoose");
const services_1 = require("../../../common/DI/services");
exports.userGQLQuery = {
    getUser: {
        type: user_gql_type_1.userGQLType,
        resolve: async () => {
            return await services_1.userService.profile(new mongoose_1.Types.ObjectId("6a1c7b9ad357f3b024064473"));
        },
    },
};
