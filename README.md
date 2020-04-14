# Concepts

---

Table of contents

1. [HTTP methods](#http)
1. [Request Contents](#route)
1. [Middleware Concepts](#middleware)
   - [Globally](#globally)
   - [Locally](#locally)

---

- **Route** = is the complete path

- **Resource** = is what i want to access `Ex: /user`

---

<div id='http'>

> **HTTP METHODS**

- _GET_ = Search or list an info
- _POST_ = Create an info
- _PUT_ = Edit info
- _DELETE_ = Delete info

---

<div id='route'>

> **Request Contents**

- **Route params** = /users/:id `> Used to identify resources`

- **Query params** = ?page=2 `> Named parameters sent after the ?`

- **Body reques**t = {"name": "Firstname Lastname", "email": "user@..." } `>for create or edit an resource`

---

<div id='middleware'>

> **Middleware Concepts**

I can create middlewares globally and locally and the difference bettween them is, the globally are acessed in all my application, and the locally just in the scope that i defined.

<div id='globally'>

- **Globally**

In express these global middlewares are defined by the `.use` method.

```javascript
//Global middleware to count the quantity of requests
server.use((req, res, next) => {
  console.count("Count Request");

  next();
});
```

<div id='locally'>

- **Locally**

_I use this logic in my routes file, to check if a user are already in my array of users._

```javascript
//Local middleware to check if my user already exist
function checkUserExist(req, res, next) {
  const { name } = req.body;
  const user = users.filter((el) => el === name).toString();

  if (name === user) {
    return res.status(400).json({ err: "User already exist" });
  }
  return next();
}
```

_With the middleware defined i used him(for example) in my route to add users, i pass it after my route and if the user already exist the request will stop and enter in my middleware logic._

```javascript
//route to add users
routes.post("/users", checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});
```
