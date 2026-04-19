"use strict";
// design pattern from nestjs >> dependency injection
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const email_utils_1 = require("../../common/utils/email.utils");
const user_repository_1 = require("../../DB/models/user/user.repository");
const redis_service_1 = require("../../DB/redis.service");
// single tone design pattern >> singleton from nestjs (class AuthService{})
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    //camelCase : PascalCase
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
        (0, email_utils_1.sendMail)({
            to: email,
            subject: "account verification",
            html: `<h1>${otp}</h1>`,
        });
        //create user into redis
        await (0, redis_service_1.setIntoCache)(`${email}:otp`, otp, 3 * 60);
        (0, redis_service_1.setIntoCache)(email, JSON.stringify(signupDTO), 3 * 24 * 60 * 60);
    }
    login(loginDTO) { }
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
}
exports.default = new AuthService();
