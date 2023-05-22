import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const userLaith = await prisma.user.create({
    data: {
      first_name: "Laith",
      last_name: "Harb",
      email: "laith@hotmail.com",
      city: "ottawa",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userJosh = await prisma.user.create({
    data: {
      first_name: "Josh",
      last_name: "Allen",
      email: "josh@hotmail.com",
      city: "toronto",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userLebron = await prisma.user.create({
    data: {
      first_name: "LeBron",
      last_name: "James",
      email: "lebron@hotmail.com",
      city: "niagara",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userCassidy = await prisma.user.create({
    data: {
      first_name: "Cassidy",
      last_name: "Marksom",
      email: "cassidy@hotmail.com",
      city: "toronto",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });
  console.log("Seed successful");
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
