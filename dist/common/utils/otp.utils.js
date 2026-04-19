"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    const minNum = 100000; //min 6 digits
    const maxNum = 900000; //max 6 digits
    return Math.floor(Math.random() * minNum + maxNum);
};
exports.generateOTP = generateOTP;
