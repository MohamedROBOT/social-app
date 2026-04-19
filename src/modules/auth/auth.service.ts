// design pattern from nestjs >> dependency injection

import {
  BadRequestException,
  ConflictException,
  encryption,
  generateOTP,
  hash,
  NotFoundException,
} from "../../common";
import { sendMail } from "../../common/utils/email.utils";
import { UserRepository } from "../../DB/models/user/user.repository";

import {
  deleteFromCache,
  getFromCache,
  setIntoCache,
} from "../../DB/redis.service";
import {
  LoginDTO,
  ResetPasswordDTO,
  SendOtpDTO,
  SignupDTO,
  VerifyAccountDTO,
} from "./auth.dto";

// single tone design pattern >> singleton from nestjs (class AuthService{})
class AuthService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  //camelCase : PascalCase
  async signup(signupDTO: SignupDTO) {
    const { email } = signupDTO;
    //check user existence
    const userExist = await this.userRepository.getOne({ email: email });
    if (userExist) throw new ConflictException("user already exist");
    //hash password and mutation it
    signupDTO.password = await hash(signupDTO.password);
    //encrypt phone number and mutate it
    if (signupDTO.phoneNumber)
      signupDTO.phoneNumber = encryption(signupDTO.phoneNumber);
    //send otp
    const otp = generateOTP();
    //send email
    sendMail({
      to: email,
      subject: "account verification",
      html: `<h1>${otp}</h1>`,
    });
    //create user into redis
    await setIntoCache(`${email}:otp`, otp, 3 * 60);
    setIntoCache(email, JSON.stringify(signupDTO), 3 * 24 * 60 * 60);
  }

  login(loginDTO: LoginDTO) {}

  async sendOTP(sendOtpDTO: SendOtpDTO) {
    //check email existence in db
    const userExist = await this.userRepository.getOne({
      email: sendOtpDTO.email,
    });
    //check email existence in cache
    const userExistInCache = await getFromCache(sendOtpDTO.email);
    if (!userExist && !userExistInCache)
      throw new NotFoundException("user not found, please signup");
    // check has valid otp in cache
    const validOTP = await getFromCache(`${sendOtpDTO.email}:otp`);
    if (validOTP)
      throw new BadRequestException("otp already sent to your email");
    // generate new otp
    const otp = generateOTP();
    //send email
    sendMail({
      to: sendOtpDTO.email,
      subject: "re-send otp",
      html: `<h1>${otp}</h1>`,
    });
    //save new otp in cache
    await setIntoCache(`${sendOtpDTO.email}:otp`, otp, 3 * 60);
  }
  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    //check email existence in db
    const user = await this.userRepository.getOne({
      email: resetPasswordDTO.email,
    });
    if (!user) throw new NotFoundException("user not found");
    //check otp valid
    const validOTP = await getFromCache(`${resetPasswordDTO.email}:otp`);
    if (!validOTP && validOTP !== resetPasswordDTO.otp)
      throw new BadRequestException("invalid otp");
    //hash password
    resetPasswordDTO.password = await hash(resetPasswordDTO.password);
    //update password
    await this.userRepository.updateOne(
      { email: resetPasswordDTO.email },
      { password: resetPasswordDTO.password },
    );
    await deleteFromCache(`${resetPasswordDTO.email}:otp`);
  }

  async verifyAccount(verifyAccountDTO: VerifyAccountDTO) {
    const { email, otp } = verifyAccountDTO;
    //check user existence in redis
    const userData = await getFromCache(email);
    if (!userData) throw new NotFoundException("user not found");
    //check otp and compare in redis
    const cacheOTP = await getFromCache(`${email}:otp`);

    if (cacheOTP === null) throw new BadRequestException("otp expired");
    if (cacheOTP !== otp) throw new BadRequestException("invalid otp");
    //if true delete otp and save user to db and remove it from redis (user - otp)
    await this.userRepository.create(JSON.parse(userData));
    await deleteFromCache(`${email}:otp`);
    await deleteFromCache(email);
  }
}

export default new AuthService();
