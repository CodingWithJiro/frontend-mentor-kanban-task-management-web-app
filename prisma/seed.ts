import prisma from "../src/lib/prisma.ts";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: "johndoepasswordhash",
      boards: {
        create: {
          name: "John Doe's Board",
          position: 1,
        },
      },
    },
  });

  console.log(`Created user: ${user.name}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
