import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { SECRETKEY } from "./constants";

// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  // Compare Password
  export const comparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  };

  export const OTP =  () =>{
    return  Math.floor(100000 + Math.random() * 900000);
  }

  
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
