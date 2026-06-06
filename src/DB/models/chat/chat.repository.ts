import { injectable } from "tsyringe";
import { IChat } from "../../../common/interfaces/chat.interface";
import { AbstractRepository } from "../../abstract.repository";
import { Chat } from "./chat.model";
//apply functionality of injectable
//we use a decorator which is a function that can be applied on a class, attr, parameter
@injectable()
export class ChatRepository extends AbstractRepository<IChat> {
    constructor(){
        super(Chat)
    }
}

