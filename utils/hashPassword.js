// utils/hashPassword.js
import bcrypt from 'bcryptjs';

export function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}