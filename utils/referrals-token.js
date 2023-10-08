const CryptoJS = require("crypto-js");

// Replace these with your own secret key and adminId
const secretKey = "AWAIS01"; // Replace with a strong secret key
const adminId = 123456; // Replace with the adminId you want to encrypt

// Encrypt the adminId
const encryptedAdminId = CryptoJS.AES.encrypt(
  adminId.toString(),
  secretKey
).toString();
// Decrypt the token to get back the adminId
const decryptedAdminId = CryptoJS.AES.decrypt(
  encryptedAdminId,
  secretKey
).toString(CryptoJS.enc.Utf8);
console.log("Encrypted Token:", encryptedAdminId);
console.log("Decrypted Admin ID:", decryptedAdminId);
