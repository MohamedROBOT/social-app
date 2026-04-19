//dependency injection
import bcrypt from "bcrypt";
/**
 * 
 * @param password plain text
 * @returns hashed password
 */
export const hash = async (password: string) => {
  return bcrypt.hash(password, 12);
};

/**
 * 
 * @param password which comes from frontend
 * @param hashedPassword which comes from db
 * @returns promise of boolean
 */
export const compare = async (password: string, hashedPassword: string) => {
  bcrypt.compare(password, hashedPassword);
};
