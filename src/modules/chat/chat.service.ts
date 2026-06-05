import { Types } from "mongoose";
import chatRepository, { ChatRepository } from "../../DB/models/chat/chat.repository";
import { NotFoundException } from "../../common";
import messageRepository, { MessageRepository } from "../../DB/models/message/message.repository";

class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
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


export default new ChatService(
    chatRepository,
    messageRepository
)