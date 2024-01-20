import { PrismaClient } from "@prisma/client"
import { BadRequestError } from "@/errors/bad-request-error"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const res = await request.json()
  const { username, email } = res
  console.log(res)

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

  return Response.json(res)
}
