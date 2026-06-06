import { Types } from "mongoose";
import { NotFoundException } from "../../common";
import { ICloudProvider } from "../../common/cloud/cloud.interface";
import { UserFriendRepository } from "../../DB/models/user-friend/user-friend.repository";
import { UserRepository } from "../../DB/models/user/user.repository";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../common/DI/tokens";
@injectable()
export class UserService {
  constructor(
    @inject(TOKENS.S3CloudProvider)
    private readonly cloudProvider: ICloudProvider,
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TOKENS.UserFriendRepository)
    private readonly userFriendRepository: UserFriendRepository,
  ) {}

  async uploadProfilePic(file: Express.Multer.File, userId: Types.ObjectId) {
    // 1. upload to s3
    const key = await this.cloudProvider.uploadFile(
      file,
      `users/${userId.toString()}`,
    );
    // 2. update DB
    const user = await this.userRepository.updateOne(
      { _id: userId },
      { profilePic: key },
      {
        returnDocument: "before",
      },
    );
    if (!user) throw new NotFoundException("User not found");
    // 3. delete old pp
    if (user.profilePic) await this.cloudProvider.deleteFile(user.profilePic);
  }
  async profile(userId: Types.ObjectId) {
    const user = await this.userRepository.getOne({ _id: userId });
    //you might be the sender (and he accept) or receiver (incase you accept)
    const friends = await this.userFriendRepository.getAll(
      {
        $or: [{ user: userId }, { friend: userId }],
      },
      {},
      { populate: [{ path: "user" }, { path: "friend" }] },
    );
    //get groups
    //groups
    return { user, friends };
  }
}
