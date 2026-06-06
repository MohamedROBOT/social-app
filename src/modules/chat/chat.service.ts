import { Types } from "mongoose";
import { NotFoundException } from "../../common";
import { ChatRepository } from "../../DB/models/chat/chat.repository";
import { MessageRepository } from "../../DB/models/message/message.repository";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../common/DI/tokens";
@injectable()
export class ChatService {
  constructor(
   @inject(TOKENS.ChatRepository) private readonly chatRepository: ChatRepository,
    @inject(TOKENS.MessageRepository) private readonly messageRepository: MessageRepository,
  ) {}
  async getChat(chatId: Types.ObjectId, userId: Types.ObjectId) {
    const chat = await this.chatRepository.getOne({
      _id: chatId,
      participants: { $in: [userId] },
    });
    if (!chat) throw new NotFoundException("Chat not found");
    const messages = await this.getMessages(chatId);
    return { chat, messages };
  }

  async getMessages(chatId: Types.ObjectId) {
    const messages = await this.messageRepository.getAll(
      { chat: chatId },
      {},
      {
        limit: 20,
        sort: { createdAt: -1 },
      },
    );
    return messages;
  }
}


