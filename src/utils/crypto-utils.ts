import CryptoJS from "crypto-js";
const SECRET_KEY = "aidstat-secret-key-MIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQDLx3mZ5f7JkP9T";

export const safeEncrypt = (text: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

  return ciphertext.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const safeDecrypt = (urlSafeCipher: string): string => {
  let base64 = urlSafeCipher.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";

  const bytes = CryptoJS.AES.decrypt(base64, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (!decrypted) throw new Error("Failed to decrypt. Possibly wrong key or corrupted data.");
  return decrypted;
};
