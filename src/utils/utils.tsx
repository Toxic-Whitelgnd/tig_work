import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { SECRETKEY } from "./cosntants";

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = parseInt("10", 10); // Configurable salt rounds
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Could not hash the password.");
  }
};
  
  // Compare Password
  export const comparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  };

  // Encrypt Password
export const encryptPassword = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, SECRETKEY).toString();
  return encrypted;
};

// Decrypt Password (if needed for client-side usage)
export const decryptPassword = (encryptedPassword: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRETKEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};