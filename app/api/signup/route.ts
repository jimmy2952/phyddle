// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res)

  // const data = await res.json()

  return Response.json(res)
}
