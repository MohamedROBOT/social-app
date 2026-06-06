"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeGateway = void 0;
const socket_io_1 = require("socket.io");
const utils_1 = require("../utils");
const config_1 = require("../../config");
const DI_1 = require("../DI");
class RealtimeGateway {
    _io;
    cacheProvider;
    constructor(server) {
        this.cacheProvider = DI_1.redisCacheProvider;
        this._io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    }
    establishConnection() {
        this._io.use((socket, next) => {
            try {
                socket.data = (0, utils_1.verifyToken)(socket.handshake.auth.token, config_1.JWT_ACCESS_SECRET);
                next();
            }
            catch (error) {
                next(error);
            }
        });
        this._io.on("connection", async (socket) => {
            console.log("New Connection", socket.id);
            //set socket id to logged in user
            await this.cacheProvider.addToSet(`socketIds:${socket.data.sub}`, socket.id);
            socket.on("disconnect", async () => {
                console.log("Disconnected", socket.id);
                await this.cacheProvider.rmSet(`socketIds:${socket.data.sub}`, socket.id);
                //remove socket id from disconnected user
            });
        });
    }
    get io() {
        return this._io;
    }
}
exports.RealtimeGateway = RealtimeGateway;
