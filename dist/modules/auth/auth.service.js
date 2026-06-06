"use strict";
// design pattern from nestjs >> dependency injection
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("../../common");
const email_utils_1 = require("../../common/utils/email.utils");
const user_repository_1 = require("../../DB/models/user/user.repository");
const redis_service_1 = require("../../DB/redis.service");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../common/DI/tokens");
let AuthService = class AuthService {
    userRepository;
    mailProvider;
    cacheProvider;
    constructor(userRepository, mailProvider, cacheProvider) {
        this.userRepository = userRepository;
        this.mailProvider = mailProvider;
        this.cacheProvider = cacheProvider;
    }
    // camelCase: PascalCase
    async signup(signupDTO) {
        const { email } = signupDTO;
        //check user existence
        const userExist = await this.userRepository.getOne({ email: email });
        if (userExist)
            throw new common_1.ConflictException("user already exist");
        //hash password and mutation it
        signupDTO.password = await (0, common_1.hash)(signupDTO.password);
        //encrypt phone number and mutate it
        if (signupDTO.phoneNumber)
            signupDTO.phoneNumber = (0, common_1.encryption)(signupDTO.phoneNumber);
        //send otp
        const otp = (0, common_1.generateOTP)();
        //send email
        // sendMail({
        //   to: email,
        //   subject: "account verification",
        //   html: `<h1>${otp}</h1>`,
        // });
        await this.mailProvider.send(email, "account verification", `<h1>${otp}</h1>`);
        //create user into redis
        await (0, redis_service_1.setIntoCache)(`${email}:otp`, otp, 3 * 60); // 3 min
        await (0, redis_service_1.setIntoCache)(email, JSON.stringify(signupDTO), 3 * 24 * 60 * 60); // 3 days
    }
    async signin(loginDTO) {
        //check email existence in db
        const userExist = await this.userRepository.getOne({
            email: loginDTO.email,
        });
        //check matched password
        const isMatched = await (0, common_1.compare)(loginDTO.password, userExist?.password);
        //avoid hacking
        if (!userExist)
            throw new common_1.BadRequestException("invalid credentials");
        if (!isMatched)
            throw new common_1.BadRequestException("invalid credentials");
        // if (!userExist) return; //we won't return anything to increase security
        if (loginDTO.FCM) {
            //assign fcm to user for notifications into cache
            //cache >> add to set => unique
            await this.cacheProvider.addToSet(`${userExist._id.toString()}:FCM`, loginDTO.FCM);
        }
        //check account verification
        //generate tokens
        return (0, common_1.generateTokens)({
            sub: userExist._id.toString(),
            email: userExist.email,
            role: userExist.role,
        });
        //set refresh token into redis
    }
    /**
     * @param  userId  from token
     * @param fcm  from FE
     * */
    async logout(userId, fcm) {
        //remove fcm from user cache
        await this.cacheProvider.rmSet(`${userId}:FCM`, fcm);
        //bl token and
    }
    async sendOTP(sendOtpDTO) {
        //check email existence in db
        const userExist = await this.userRepository.getOne({
            email: sendOtpDTO.email,
        });
        //check email existence in cache
        const userExistInCache = await (0, redis_service_1.getFromCache)(sendOtpDTO.email);
        if (!userExist && !userExistInCache)
            throw new common_1.NotFoundException("user not found, please signup");
        // check has valid otp in cache
        const validOTP = await (0, redis_service_1.getFromCache)(`${sendOtpDTO.email}:otp`);
        if (validOTP)
            throw new common_1.BadRequestException("otp already sent to your email");
        // generate new otp
        const otp = (0, common_1.generateOTP)();
        //send email
        (0, email_utils_1.sendMail)({
            to: sendOtpDTO.email,
            subject: "re-send otp",
            html: `<h1>${otp}</h1>`,
        });
        //save new otp in cache
        await (0, redis_service_1.setIntoCache)(`${sendOtpDTO.email}:otp`, otp, 3 * 60);
    }
    async resetPassword(resetPasswordDTO) {
        //check email existence in db
        const user = await this.userRepository.getOne({
            email: resetPasswordDTO.email,
        });
        if (!user)
            throw new common_1.NotFoundException("user not found");
        //check otp valid
        const validOTP = await (0, redis_service_1.getFromCache)(`${resetPasswordDTO.email}:otp`);
        if (!validOTP && validOTP !== resetPasswordDTO.otp)
            throw new common_1.BadRequestException("invalid otp");
        //hash password
        resetPasswordDTO.password = await (0, common_1.hash)(resetPasswordDTO.password);
        //update password
        await this.userRepository.updateOne({ email: resetPasswordDTO.email }, { password: resetPasswordDTO.password });
        await (0, redis_service_1.deleteFromCache)(`${resetPasswordDTO.email}:otp`);
    }
    async verifyAccount(verifyAccountDTO) {
        const { email, otp } = verifyAccountDTO;
        //check user existence in redis
        const userData = await (0, redis_service_1.getFromCache)(email);
        if (!userData)
            throw new common_1.NotFoundException("user not found");
        //check otp and compare in redis
        const cacheOTP = await (0, redis_service_1.getFromCache)(`${email}:otp`);
        if (cacheOTP === null)
            throw new common_1.BadRequestException("otp expired");
        if (cacheOTP !== otp)
            throw new common_1.BadRequestException("invalid otp");
        //if true delete otp and save user to db and remove it from redis (user - otp)
        await this.userRepository.create(JSON.parse(userData));
        await (0, redis_service_1.deleteFromCache)(`${email}:otp`);
        await (0, redis_service_1.deleteFromCache)(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)()
    // single tone design pattern >> singleton from nestjs (class AuthService{})
    ,
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.UserRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.TOKENS.NodemMailerProvider)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.TOKENS.RedisCacheProvider)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, Object, Object])
], AuthService);
