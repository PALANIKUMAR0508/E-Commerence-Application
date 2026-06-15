import crypto from "crypto";

const bytes = crypto.randomBytes(20);
console.log(bytes);
console.log(bytes.toString());
console.log(bytes.toString("hex"));
const token = bytes.toString("hex");
const resetToken = crypto.createHash("sha256").update(token).digest("hex");
//sha256 hash code tha token convert panni thirupa gigest panni hex kudu compare pannrom
//eppadi panna code unique aa irukum
console.log(token);
console.log(resetToken);
console.log(Date.now() + 30 * 60 * 1000);
