import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof users.$inferInsert = {
    name: "Jane",
    age: 10,
    email: "jane@gmai.com",
  };

  await db.insert(users).values(user);
  console.log("New user created in user.");

  const allUsers = await db.select().from(users);
  console.log("Getting all users from the database: ", allUsers);

  await db.update(users).set({ age: 11 }).where(eq(users.email, user.email));
  console.log("Updated user's age in users.");

  await db.delete(users).where(eq(users.email, user.email));
  console.log("Deleted user from users.");
}

main();


// output: 
// npx tsx src/playground.ts
// New user created in user.
// Getting all users from the database:  [ { id: 1, name: 'Jane', age: 10, email: 'jane@gmai.com' } ]
// Updated user's age in users.
// Deleted user from users.