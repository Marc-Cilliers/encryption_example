import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

const payload = require("./encrypted.json");
const privateKey = fs.readFileSync(path.resolve("privateKey.pem"), "utf8");

const encryptedKey = Buffer.from(payload.a, "base64");
const key = crypto.privateDecrypt(privateKey, encryptedKey);

const encryptedData = Buffer.from(payload.b, "base64");
const iv = encryptedData.subarray(0, 16);
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

let decrypted = decipher.update(encryptedData.subarray(16));
decrypted = Buffer.concat([decrypted, decipher.final()]);
const decryptedString = decrypted.toString();

fs.writeFileSync(
  "decrypted.json",
  JSON.stringify(JSON.parse(decryptedString), null, 2)
);

console.log("🔓 Decrypted");
