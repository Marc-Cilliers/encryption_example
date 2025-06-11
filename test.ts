import * as fs from "fs";

import "./encrypt";
import "./decrypt";

const originalPayload = JSON.parse(fs.readFileSync("payload.json", "utf8"));
const decryptedJson = JSON.parse(fs.readFileSync("decrypted.json", "utf8"));

if (JSON.stringify(decryptedJson) === JSON.stringify(originalPayload)) {
  console.log("✅ Decryption matches original payload");
  process.exit(0);
} else {
  console.error("❌ Decryption does NOT match original payload");
  process.exit(1);
}
