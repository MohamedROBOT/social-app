import { injectable } from "tsyringe";
import { IUserReaction } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { UserReaction } from "./user-reaction.model";
@injectable()
export class UserReactionRepository extends AbstractRepository<IUserReaction> {
    constructor(){
        super(UserReaction)
    }
}