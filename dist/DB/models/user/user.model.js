"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../../../common");
//using generics to make sure that the schema is of type IUser
const schema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: function () {
            if (this.provider !== common_1.SYS_PROVIDER.system)
                return false;
            return true;
        },
    },
    role: {
        type: Number,
        enum: common_1.SYS_ROLE,
        default: common_1.SYS_ROLE.user,
    },
    provider: {
        type: Number,
        enum: common_1.SYS_PROVIDER,
        default: common_1.SYS_PROVIDER.system,
    },
    gender: {
        type: Number,
        enum: common_1.SYS_GENDER,
        default: common_1.SYS_GENDER.male
    },
}, { timestamps: true });
// schema.pre("save", function(){
//   //logic before hashing the password
//   //this refers to document
// })
// //target document methods
// schema.pre("updateOne", {document:true, query:false},function(){
// })
exports.User = (0, mongoose_1.model)("User", schema);
