import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

const data = require("./encrypted.json");
const encryptedKey = Buffer.from(data.a, "base64");

const privateKey = fs.readFileSync(path.resolve("privateKey.pem"), "utf8");
const key = crypto.privateDecrypt(privateKey, encryptedKey);

const encryptedData = Buffer.from(data.b, "base64");
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
