import { INotificationProvider } from "../notification.interface";
import admin from "firebase-admin";
import { injectable } from "tsyringe";
import fs from "node:fs";
import path from "node:path";
export const config = JSON.parse(fs.readFileSync(path.resolve('./src/config/test-firebase-4052a-firebase-adminsdk-fbsvc-4e18f55b04.json')) as unknown as string);

@injectable()
export class FirebasePushNotificationProvider implements INotificationProvider {
  private client: admin.app.App;
  constructor() {
    this.client = admin.initializeApp({ credential: admin.credential.cert(config) });
  }


  async send(token: string, data: { title: string; body: string }): Promise<void> {
  await  this.client.messaging().send({token, data})
  }
  async sendAll(tokens: string[], data: { title: string; body: string; }): Promise<void> {
 await Promise.all(tokens.map(token=>this.send(token,data)))
  }

}
