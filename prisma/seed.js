import { hashPassword } from "../utils/hashPassword.js";
import prisma from "../db/prismaClient.js";

async function main() {
  try {
    console.log('Seeding started...');

    const adminData = {
      name: "admin",
      email: "admin@example.com",
      password: hashPassword("password"),
      role: "ADMIN",
    };

    const admin = await prisma.user.upsert({
      where: { email: adminData.email },
      update: {}, // Empty update since we only care about creation or skipping
      create: adminData,
    });

    console.log(`Admin created with email: ${admin.email}`);
  } catch (error) {
    console.error('Error in seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();