"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_service_1 = require("./firebase.service");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
//or toString();
const config = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.resolve('./src/config/test-firebase-4052a-firebase-adminsdk-fbsvc-21083397f1.json')));
exports.default = new firebase_service_1.FirebasePushNotificationProvider(config);
