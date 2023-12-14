// const { db } = require("@vercel/postgres");
// const bcrypt = require("bcrypt");

// //uuid examples
// // 410544b2-4001-4271-9855-fec4b6a6442a
// // 3958dc9e-712f-4377-85e9-fec4b6a6442a
// // 3958dc9e-742f-4377-85e9-fec4b6a6442a

// const users = [
//   {
//     username: "janesmith",
//     password: "123456",
//   },
//   {
//     username: "johndoe",
//     password: "654321",
//   },
// ];

// const habits = [
//   {
//     id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     username: "janesmith",
//     h_name: "drink water",
//     start_date: "2023-10-05",
//     completion_dates: ["2023-10-06", "2023-10-10", "2023-10-15"],
//     color: "blue",
//   },
//   {
//     id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     username: "janesmith",
//     h_name: "workout",
//     start_date: "2023-10-07",
//     completion_dates: ["2023-10-07", "2023-10-08", "2023-10-10"],
//     color: "red",
//   },
// ];

// async function seedUsers(client) {
//   try {
//     // Create the "invoices" table if it doesn't exist
//     // Creating columns - id, name, email, password
//     const createTable = await client.sql`
//         CREATE TABLE IF NOT EXISTS users (
//           username TEXT NOT NULL PRIMARY KEY,
//           password TEXT NOT NULL
//         );
//       `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         // this does password hashing
//         // also called "encryption"
//         // changes password to something super random
//         // so hackers and developers cant see ppl's passwords
//         // const hashedPassword = await bcrypt.hash(user.password, 10);
//         // this is inserting data into the table
//         // using template strings
//         return client.sql`
//           INSERT INTO users (username, password)
//           VALUES (${user.username}, ${user.password})
//           ON CONFLICT (username) DO NOTHING;
//         `;
//       })
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error("Error seeding users:", error);
//     throw error;
//   }
// }

// async function seedHabits(client) {
//   try {
//     // This is to create the uuid
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "invoices" table if it doesn't exist
//     // Creating columns - id, username, h_name, start_date, completion_dates, color
//     // NOT NULL = just makes sure that it wont be empty

//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS habits (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         username TEXT NOT NULL,
//         h_name TEXT NOT NULL,
//         start_date DATE NOT NULL,
//         completion_dates DATE[],
//         color TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "habits" table`);

//     // Insert data into the "users" table
//     const insertedHabits = await Promise.all(
//       habits.map(async (habit) => {
//         // this is inserting data into the table
//         // using template strings
//         return client.sql`
//         INSERT INTO habits (id, username, h_name, start_date, completion_dates, color)
//         VALUES (${habit.id}, ${habit.username}, ${habit.h_name}, ${habit.start_date}, ARRAY['2023-11-08', '2023-11-09', '2023-11-10']::date[], ${habit.color})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       })
//     );

//     console.log(`Seeded ${insertedHabits.length} users`);

//     return {
//       createTable,
//       habits: insertedHabits,
//     };
//   } catch (error) {
//     console.error("Error seeding habits:", error);
//     throw error;
//   }
// }

// async function main() {
//   const client = await db.connect();

//   await seedHabits(client);
//   await seedUsers(client);
//   await client.end();
// }

// main().catch((err) => {
//   console.error(
//     "An error occurred while attempting to seed the database:",
//     err
//   );
// });
