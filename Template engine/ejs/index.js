const express = require("express");
const app = express();

app.use(express.json());
app.set("view enginer", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs", {
    // we can give the data here
    title: "Home",
    description: "Welcome to the homepage",
    name: "Home footer",
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    title: "about us",
    services: ["web development", "app development", "seo"],
    contact: {
      email: "john@gmail.com",
    },
    name: "About footer",
  });
});

app.use((req, res) => {
  res.send("<h1>404 Page not found</h1>");
});

app.listen(8080, () => {
  console.log("server is running port 8080");
});
