import { Types } from "mongoose";
import {
  requestRepository,
  RequestRepository,
} from "../../DB/models/request/request.repository";
import {
  BadRequestException,
  NotFoundException,
  UnAuthorizedException,
} from "../../common";
import userFriendRepository, {
  
  UserFriendRepository,
} from "../../DB/models/user-friend/user-friend.repository";

class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly userFriendRepository: UserFriendRepository,
  ) {}

  /*
   * @params userId ==> sender {from token}
   * @params receiver ==> from params
   * */
  async sendRequest(senderId: Types.ObjectId, receiverId: Types.ObjectId) {
    //sender is the same as receiver
    if (senderId.toString() === receiverId.toString())
      throw new BadRequestException("Not allowed to send request to yourself");
    //check block users
    //check receiver existance
    
    //check user friends or not
    const userFriendExist = await this.userFriendRepository.getOne({
      $or: [
        { user: senderId, friend: receiverId },
        { user: receiverId, friend: senderId },
      ],
    });

    if (userFriendExist)
      throw new BadRequestException("You are already friends");
    //check sender send request or receiver
    const requestExist = await this.requestRepository.getOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (requestExist) throw new BadRequestException("Request already exists");
    // create request
    await this.requestRepository.create({
      sender: senderId,
      receiver: receiverId,
    });

    // send notification
  }

  /*
   * @params userId ==> user from token
   * @params id ==> requestId
   * */
  async acceptRequest(userId: Types.ObjectId, id: Types.ObjectId) {
    //check request existence
    const requestExist = await this.requestRepository.getOne({ _id: id });
    if (!requestExist) throw new NotFoundException("Request not found");
    //if yes, receiver accept request
    if (!requestExist.receiver.equals(userId))
      throw new UnAuthorizedException(
        "You are not authorized to accept request",
      );
    //delete request from request collection
    await this.requestRepository.deleteOne({ _id: id });
    //create user-friend model
    await this.userFriendRepository.create({
      user: userId,
      friend: requestExist.sender,
    });
  }

  /*
   * @params userId ==> logged in user
   * @params id ==> request id
   */
  async declineRequest(userId: Types.ObjectId, id: Types.ObjectId) {
    //check request existence
    const requestExist = await this.requestRepository.getOne({ _id: id });

    if (!requestExist) throw new NotFoundException("Request not found");
    // if yes, check sender or receiver
    if (
      !userId.equals(requestExist.sender) ||
      !userId.equals(requestExist.receiver)
    )
      throw new UnAuthorizedException(
        "You are not authorized to decline or cancel request",
      );
    // delete from request collection
    await this.requestRepository.deleteOne({ _id: id });
  }

  //another solution
  async declineRequest2(userId: Types.ObjectId, id: Types.ObjectId) {
    //check request existence

    const { deletedCount } = await this.requestRepository.deleteOne({
      _id: id,
      $or: [
        {
          sender: userId,
        },
        {
          receiver: userId,
        },
      ],
    });

    if (deletedCount === 0)
      throw new BadRequestException(
        "You are not authorized to decline or cancel request",
      );
  }

  /*
   * @params userId => token
   * @params id => friendId
   */
  async removeFriend(userId: Types.ObjectId, id: Types.ObjectId) {
    //check user friend existence
    const userFriendExist = await this.userFriendRepository.getOne({
      $or: [
        { user: userId, friend: id },
        { user: id, friend: userId },
      ],
    });
    if (!userFriendExist) throw new NotFoundException("Friend not found");
    //if yes, check user or friend
    if (
      !userId.equals(userFriendExist.user) ||
      !userId.equals(userFriendExist.friend)
    )
      throw new UnAuthorizedException(
        "You are not authorized to remove friend",
      );
    //delete from user-friend collection
    await this.userFriendRepository.deleteOne({
      _id: userFriendExist._id,
    });
  }
  async removeFriend2(userId: Types.ObjectId, id: Types.ObjectId) {
    if (userId.toString() === id.toString())
      throw new BadRequestException("Not allowed to remove yourself");
    //delete from user-friend collection
    const { deletedCount } = await this.userFriendRepository.deleteOne({
      $or: [
        { user: userId, friend: id },
        { user: id, friend: userId },
      ],
    });

    if (deletedCount === 0) throw new NotFoundException("You are not friends");
  }
}
//we will apply dependency injection
export default new RequestService(requestRepository, userFriendRepository);
