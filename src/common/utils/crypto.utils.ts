import crypto from "node:crypto";
import { ENCRYPTION_SECRET } from "../../config";

export const encryption = (plainText: string) => {
  //8 byte >> 16 * 8 =>> secret key >> 32
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_SECRET), //32
    //IV for Iteration Vector
    iv,
  );
  let encryptedData = cipher.update(plainText, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decryption = (encryptedData: string) => {
  const [iv, encryptedValue] = encryptedData.split(":");
  const ivBufferLike = Buffer.from(iv as string, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_SECRET),
    ivBufferLike,
  );
//type assertion because we know it's always string
  let decryptedValue = decipher.update(encryptedValue as string, "hex", "utf-8");
  decryptedValue += decipher.final("utf-8");
  return decryptedValue;
};
