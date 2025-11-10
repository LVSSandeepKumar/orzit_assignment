import { PrismaClient } from "prisma";
import { hashPassword } from "../utils/hashPassword";

const prisma = new PrismaClient();

export async function main() {
  try {
    console.log("We are here lol");
    const adminData = {
      name: "admin",
      email: "admin@example.com",
      password: hashPassword("password"),
      role: "ADMIN",
    };

    const createdAdmin = await prisma.user.create(adminData);

    console.log(`Admin created with email : ${createdAdmin?.email}`);
  } catch (error) {
    console.error("Error in seeding", error);
  }
}

main()
  .then(async () => {
    console.log("Atleast we are here");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.log("We are here as well");
    await prisma.$disconnect();
    process.exit(1);
  });
