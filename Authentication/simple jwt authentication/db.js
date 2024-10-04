const fs = require("node:fs/promises");

// callback type method
// fs.readFile("./users.json", "utf-8", (err, data) => {
//   if (err) {
//     return console.log(err);
//   }
//   try {
//     const jsonData = JSON.parse(data);
//     console.log(jsonData);
//   } catch (err) {
//     console.log(err);
//   }
// });

async function getUsers(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.users;
  } catch (err) {
    console.log(err);
  }
}

async function saveUsers(users, filePath) {
  try {
    await fs.writeFile(filePath, JSON.stringify({ users }));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUsers, saveUsers };
