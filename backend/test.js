import prisma from "./config/prisma.js";

export async function test() {
  try {
    await prisma.$connect();
    console.log("Connecté à Supabase ✅");
  } catch (err) {
    console.error(err);
  } 
}

test();