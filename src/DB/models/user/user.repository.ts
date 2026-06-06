import { injectable } from "tsyringe";
import { IUser } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { User } from "./user.model";
@injectable()
export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }
}

