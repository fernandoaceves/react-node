"use strict";
module.exports = function (app) {
  var gamebookCollection = require("./gamebookCollectionController");

  app.route("/users/:user").get(gamebookCollection.obtener_contrasena);
  app
    .route("/games")
    .get(gamebookCollection.obtener_juegos)
    .post(gamebookCollection.agregar_juego);
  app
    .route("/games/busqueda/:palabraClave")
    .get(gamebookCollection.buscar_palabra_clave);
  app
    .route("/events")
    .get(gamebookCollection.obtener_eventos)
    .post(gamebookCollection.agregar_evento);
};
