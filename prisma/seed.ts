import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      emails: {
        create: [
          {
            subject: 'Hello from Alice',
            content: 'This is a test email from Alice.',
          },
        ],
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      emails: {
        create: [
          {
            subject: 'Hello from Bob',
            content: 'This is a test email from Bob.',
          },
        ],
      },
    },
  })

  const dylan = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'dylan@example.com',
      name: 'Dylan',
      emails: {
        create: [
          {
            subject: 'Hello from Dylan',
            content: 'This is a test email from Bob.',
          },
        ],
      },
    },
  })

  const exampleEmail = await prisma.email.create({
    data: {
      subject: 'Example Email Subject',
      content: 'This is an example email content.',
      user: {
        connect: { email: 'alice@example.com' } // Connect to an existing user
      }
    }
  })

  console.log({ alice, bob, dylan, exampleEmail })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })