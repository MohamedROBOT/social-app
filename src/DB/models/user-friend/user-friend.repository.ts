import { injectable } from "tsyringe";
import { IUserFriend } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { UserFriend } from "./user-friend.model";
@injectable()
export class UserFriendRepository extends AbstractRepository<IUserFriend> {
  constructor() {
    super(UserFriend);
  }
}


