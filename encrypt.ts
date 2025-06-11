import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

const payload = require("./payload.json");
const publicKey = fs.readFileSync(
  path.join(__dirname, "publicKey.pem"),
  "utf8"
);

const payloadString = JSON.stringify(payload);

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
const encryptedPayload = Buffer.concat([
  cipher.update(payloadString, "utf8"),
  cipher.final(),
]);

const encryptedPayloadWithIV = Buffer.concat([iv, encryptedPayload]);
const encryptedKey = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha1", // match the C# which uses OAEP-SHA1
  },
  key
);

const finalResult = {
  org_id: "TEST",
  a: encryptedKey.toString("base64"),
  b: encryptedPayloadWithIV.toString("base64"),
};
fs.writeFileSync("encrypted.json", JSON.stringify(finalResult, null, 2));

console.log("🔐 Encrypted");
