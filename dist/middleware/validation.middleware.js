"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGQL = exports.isValid = void 0;
const common_1 = require("../common");
const isValid = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path[0],
                };
            });
            throw new common_1.BadRequestException("validation error", errorMessages);
        }
        next();
    };
};
exports.isValid = isValid;
const isValidGQL = async (schema, args) => {
    const result = await schema.safeParseAsync(args);
    if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => {
            return {
                message: issue.message,
                path: issue.path[0],
            };
        });
        throw new common_1.BadRequestException("validation error", errorMessages);
    }
};
exports.isValidGQL = isValidGQL;
