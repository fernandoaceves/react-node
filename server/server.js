// https://expressjs.com/en/guide/using-middleware.html
var express = require("express"),
  app = express(),
  port = process.env.PORT || 8585;
var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var routes = require("./gamebookCollectionRoutes");
routes(app);
app.listen(port);
console.log("Servidor escuchando en puerto: " + port);
