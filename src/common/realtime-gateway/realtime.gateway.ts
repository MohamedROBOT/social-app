import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "node:http";
import { verifyToken } from "../utils";
import { JWT_ACCESS_SECRET } from "../../config";
import { ICacheProvider } from "../cache/cache.interface";
import { inject } from "tsyringe";
import { redisCacheProvider, TOKENS } from "../DI";
export class RealtimeGateway {
  private _io: Server;
  private readonly cacheProvider:ICacheProvider
  constructor(server: HttpServer) {
    this.cacheProvider = redisCacheProvider
    this._io = new Server(server, { cors: { origin: "*" } });
  }

  establishConnection() {
    this._io.use((socket: Socket, next: any) => {
      try {
        socket.data = verifyToken(
          socket.handshake.auth.token,
          JWT_ACCESS_SECRET,
        );
        
        next();
      } catch (error) {
        next(error);
      }
    });
    this._io.on("connection",async (socket: Socket) => {
      console.log("New Connection", socket.id);

      //set socket id to logged in user
     await this.cacheProvider.addToSet(`socketIds:${socket.data.sub}`, socket.id)

      socket.on("disconnect", async() => {
        console.log("Disconnected", socket.id);
        await this.cacheProvider.rmSet(`socketIds:${socket.data.sub}`, socket.id)
        //remove socket id from disconnected user
      });
    });
  }
  get io(): Server {
    return this._io;
  }
}
