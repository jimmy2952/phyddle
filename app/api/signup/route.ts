import { PrismaClient } from "@prisma/client"
import { BadRequestError } from "@/errors/bad-request-error"
import { Password } from "@/helpers/password"
import { generateEmailVerificationToken } from "@/helpers/email_verification_token_generator"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const res = await request.json()
  const { username, email, password } = res

  const isUsernameExist = await prisma.user.findUnique({
    where: {
      username
    },
  })

  const isEmailExist = await prisma.user.findUnique({
    where: {
      email
    },
  })

  if (isEmailExist || isUsernameExist) {
    let existFields = []
    if (isUsernameExist) existFields.push("username")
    if (isEmailExist) existFields.push("email")
    throw new BadRequestError(existFields.join(", ") + "had been used")
  }

  const hashedPassword = Password.getHashedPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    },
  })

  const account = await prisma.account.create({
    data: {
      userId: user.id,
      type: "email",
      provider: "phyddle",
      providerAccountId: user.id,
    }
  })

  if (user && account) {
    // create verification token
    const token = await generateEmailVerificationToken()
    // expires after 2 hours
    const expiredTime = new Date(new Date().getTime() + 60 * 60 * 1000 * 2)
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires: expiredTime,
      }
    })
  }

  return Response.json(res)
}
