import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

export class Password {
  static getHashedPassword(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

    return hashedPassword
  }

  static compare(storedPassword: string, suppliedPassword: string): boolean {

    return bcrypt.compareSync(suppliedPassword, storedPassword)
  }
}
