const { Router } = require("express");

const routes = Router();

const users = ["FirstUser", "SecondUser", "ThirdUser"]; // Array of users

function checkUserDeclaration(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ err: "User is required" });
  }
  //Local middleware to check if my user was declared
  return next();
}

function checkUserExist(req, res, next) {
  const { name } = req.body;
  const user = users.filter((el) => el === name).toString();

  if (name === user) {
    return res.status(400).json({ err: "User already exist" });
  }
  //Local middleware to check if my user already exist
  return next();
}

function checkIndexInArray(req, res, next) {
  const user = users[req.params.id];

  if (!user) {
    return res.status(400).json({ err: "User not found" });
  }

  req.user = user; // In middleware can modify my requests and my responses

  //Local middleware to check if the index of my array exist
  return next();
}

//route to list all my users
routes.get("/users", (req, res) => {
  return res.json(users);
});

//route to filter my users
routes.get("/users/:id", checkIndexInArray, (req, res) => {
  return res.json(req.user);
});

//route to add users
routes.post("/users", checkUserDeclaration, checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//route to edit users
routes.put(
  "/users/:id",
  checkUserDeclaration,
  checkUserExist,
  checkIndexInArray,
  (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    users[id] = name;

    return res.json(users);
  }
);

//route to delete users
routes.delete("/users/:id", checkIndexInArray, (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json({ ok: "Removed" });
});

module.exports = routes;
