import { injectable } from "tsyringe";
import { IMessage } from "../../../common/interfaces/message.interface";
import { AbstractRepository } from "../../abstract.repository";
import { Message } from "./message.model";
@injectable()
export class MessageRepository extends AbstractRepository<IMessage> {
    constructor() {
        super(Message);
    }
}

