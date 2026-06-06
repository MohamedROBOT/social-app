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
exports.NodeMailerProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../config");
const tsyringe_1 = require("tsyringe");
let NodeMailerProvider = class NodeMailerProvider {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: config_1.MAIL_EMAIL,
                pass: config_1.MAIL_PASSWORD,
            },
        });
    }
    async send(to, subject, html) {
        await this.transporter.sendMail({ to, subject, html });
    }
};
exports.NodeMailerProvider = NodeMailerProvider;
exports.NodeMailerProvider = NodeMailerProvider = __decorate([
    (0, tsyringe_1.injectable)()
    //low level module that implements abstraction
    ,
    __metadata("design:paramtypes", [])
], NodeMailerProvider);
