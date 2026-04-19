"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption = exports.encryption = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const config_1 = require("../../config");
const encryption = (plainText) => {
    //8 byte >> 16 * 8 =>> secret key >> 32
    const iv = node_crypto_1.default.randomBytes(16);
    const cipher = node_crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(config_1.ENCRYPTION_SECRET), //32
    //IV for Iteration Vector
    iv);
    let encryptedData = cipher.update(plainText, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return `${iv.toString("hex")}:${encryptedData}`;
};
exports.encryption = encryption;
const decryption = (encryptedData) => {
    const [iv, encryptedValue] = encryptedData.split(":");
    const ivBufferLike = Buffer.from(iv, "hex");
    const decipher = node_crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(config_1.ENCRYPTION_SECRET), ivBufferLike);
    //type assertion because we know it's always string
    let decryptedValue = decipher.update(encryptedValue, "hex", "utf-8");
    decryptedValue += decipher.final("utf-8");
    return decryptedValue;
};
exports.decryption = decryption;
