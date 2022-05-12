/**
 * Example use:
 * Create a file called 'encrypt-me.txt' with the text to be encrypted
 * bash: node app.js -e -k=SECRET_PASSPHRASE
 * 
 * bash: node app.js -d -k=SECRET_PASSPHRASE
 */

const CryptoJS = require("crypto-js");
const fs = require("fs");

if (typeof process.argv[3] !== "string") {
  console.error("No passphrase was provided.");
  process.exit(1);
}

const passphrase = process.argv[3];

const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

if (process.argv[2] == "-e") {
  try {
    const raw = fs.readFileSync("encrypt-me.txt", "utf-8");
    const encrypted = encryptWithAES(raw);

    fs.writeFileSync("decrypt-me.txt", encrypted, "utf-8");
    console.log("Raw:\n\n", raw);
    console.log("Encrypted:\n\n", encrypted);
  } catch (error) {
    console.error(error.message);
  }
}

if (process.argv[2] === "-d") {
  try {
    const rawE = fs.readFileSync("decrypt-me.txt", "utf-8");
    const decrypted = decryptWithAES(rawE);

    fs.writeFileSync("decrypted.txt", decrypted);
    console.log("Encrypted:\n\n", rawE + '\n');
    console.log("Decrypted:\n\n", decrypted);
  } catch (error) {
    console.error(error.message);
  }
}
