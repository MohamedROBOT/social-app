"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebasePushNotificationProvider = exports.config = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const tsyringe_1 = require("tsyringe");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
exports.config = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.resolve('./src/config/test-firebase-4052a-firebase-adminsdk-fbsvc-4e18f55b04.json')));
let FirebasePushNotificationProvider = class FirebasePushNotificationProvider {
    client;
    constructor() {
        this.client = firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(exports.config) });
    }
    async send(token, data) {
        await this.client.messaging().send({ token, data });
    }
    async sendAll(tokens, data) {
        await Promise.all(tokens.map(token => this.send(token, data)));
    }
};
exports.FirebasePushNotificationProvider = FirebasePushNotificationProvider;
exports.FirebasePushNotificationProvider = FirebasePushNotificationProvider = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FirebasePushNotificationProvider);
