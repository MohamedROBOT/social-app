"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalFields = void 0;
const zod_1 = __importDefault(require("zod"));
const enums_1 = require("../enums");
exports.generalFields = {
    email: zod_1.default.email("must be a valid email address"),
    gender: zod_1.default.enum(enums_1.SYS_GENDER, { message: "gender must be male or female" }).optional(),
    password: zod_1.default.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    userName: zod_1.default.string("username must be a string").min(2).max(20),
    phoneNumber: zod_1.default.string()
};
