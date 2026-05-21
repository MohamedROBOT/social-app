import { FirebasePushNotificationProvider } from "./firebase.service";
import fs from "node:fs";
import path from "node:path";
//or toString();
const config = JSON.parse(fs.readFileSync(path.resolve('./src/config/test-firebase-4052a-firebase-adminsdk-fbsvc-4e18f55b04.json')) as unknown as string);
export default new FirebasePushNotificationProvider(config);
