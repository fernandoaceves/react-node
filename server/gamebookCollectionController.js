"use strict";
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "videojuegos_db";

exports.obtener_contrasena = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const users = database.collection("users");
  // Recuperamos el valor del parametro
  var userId = req.params.user;
  // Declaramos los filtros
  const query = { _id: userId };
  const options = {
    // Indicamos las columnas que queremos obtener en el resultado
    projection: { _id: 0, contraseña: 1 },
  };
  // Hacemos la consulta
  const user = await users.findOne(query, options);
  console.log("Consulta ejecutada...");
  res.end(JSON.stringify(user));
};

exports.obtener_juegos = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const juegos = database.collection("games");
  // Consulta sin filtros
  const query = {};
  const options = {
    projection: { _id: 0, id: 1, name: 2 },
  };
  // Hacemos la consulta
  const cursor = juegos.find(query, options);
  cursor.toArray().then((data) => {
    console.log("Resultados Obtenidos: " + data.length);
    res.end(JSON.stringify(data));
  });
};

exports.agregar_juego = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const juegos = database.collection("games");
  var nuevoJuego = req.body;
  const result = await juegos.insertOne(nuevoJuego);
  console.log(`Juego creado: ${result.insertedId}`);
  res.end();
};

exports.buscar_palabra_clave = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const juegos = database.collection("games");
  // Obtenemos el valor del parametro
  var palabraClave = req.params.palabraClave;
  // Declaramos los filtros
  const query = { name: new RegExp(palabraClave, "i") };
  // Hacemos la consulta
  const cursor = juegos.find(query);
  cursor.toArray().then((data) => {
    console.log("Resultados Obtenidos: " + data.length);
    res.end(JSON.stringify(data));
  });
};

exports.obtener_eventos = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const eventos = database.collection("eventos_log");
  // Consulta sin filtros
  const query = {};
  const options = {
    projection: { _id: 0, event: 1, user: 2 },
  };
  // Hacemos la consulta
  const cursor = eventos.find(query, options);
  cursor.toArray().then((data) => {
    console.log("Resultados Obtenidos: " + data.length);
    res.end(JSON.stringify(data));
  });
};

exports.agregar_evento = async function (req, res) {
  //Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const eventos = database.collection("events_log");
  var nuevoEvento = req.body;
  const result = await eventos.insertOne(nuevoEvento);
  console.log(`Evento creado: ${result.insertedId}`);
  res.end();
};
