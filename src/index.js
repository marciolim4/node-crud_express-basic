const express = require("express");
const routes = require("./routes");

const app = express();

//Allow backend to understand JSON requests
app.use(express.json());

app.use((req, res, next) => {
  console.time("Request");
  console.log(`Méthod: ${req.method}, URL: ${req.url}`);
  /* Global middleware to see my methods, url and the time that 
  each request takes */

  next();

  console.timeEnd("Request");
});

app.use(routes); //Allow routes to be used between all my application

app.listen(PORT || 3333, () => {
  console.log("Server is running");
});
