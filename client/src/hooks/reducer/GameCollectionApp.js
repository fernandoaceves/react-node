import React, { useEffect, useReducer } from "react";
import "./todoStyles.css";
import { GameCollectionAdd } from "./GameCollectionAdd";
import { GameCollection } from "./GameCollection";
import { gameReducer } from "./gameReducer";

//Creamos la función init que va utilizar el hook useReducer para inicializar su estado.
const init = () => {
  //Regresamos el contenido de localStorage como estado inicial. Si lo que obtenemos de localStorage regresa
  // null entonces regresamos un arreglo vacío [].

  fetch("http://localhost:8585/games").then((res) => {
    res.json().then((result) => {
      console.log(result);
    });
  });

  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const GameCollectionApp = () => {
  //Utilizamos el useReducer.
  //En la desestructuracion, estamos obteniendo el estado del todo con todoState, y el dispatch el cual se
  // va utilizar para poder mandar una acción al reducer y que finalmente va redibujar el componente.
  const [gameState, dispatch] = useReducer(gameReducer, [], init);
  useEffect(() => {
    //Debido a que en localStorage sólo se pueden guardar strings y no objetos, si queremos guarar un
    // JSON debemos convertirlo a string con JSON.stringify
    //localStorage.setItem("todos", JSON.stringify(gameState));
    /*const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: gameState,
    };
    fetch("http://localhost:8585/games", requestOptions).then((response) =>
      response.json()
    );*/
  }, [gameState]);
  //Mostramos en la consola del navegador el estado del todo.
  //Este método nos va servir para agregar un nuevo TODO a la lista
  const handleNewGame = (nuevoGame) => {
    gameToDB(nuevoGame);
    //Creamos el action 'add' que se va enviar al reducer
    const action = {
      type: "add",
      payload: nuevoGame,
    };
    //Utilizamos la variable dispatch que obtuvimos en la desestructuración de useReducer para
    // enviar la acción al reducer.
    dispatch(action);
  };

  const gameToDB = (game) => {
    console.log(JSON.stringify(game));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    };

    fetch("http://localhost:8585/games", requestOptions).then((response) =>
      response.json()
    );
  };
  //Dispara el evento 'delete' hacia el reducer para eliminar un elemento de la lista.
  const handleDeleteGame = (gameId) => {
    //console.log(gameId);
    //Creamos el action 'delete' que se va enviar al reducer. En el payload es suficiente con que enviemos
    // el ID del todo a elminiar ya que en el reducer se utiliza en el filter para descartarlo de la lista.
    const action = {
      type: "delete",
      payload: gameId,
    };
    //Utilizamos la variable dispatch que obtuvimos en la desestructuración de useReducer para
    // enviar la acción al reducer.
    dispatch(action);
  };
  return (
    <>
      <h1>Game Collection App ({gameState.length})</h1>
      <hr />
      {
        //Creamos la lista de TODOs
      }
      <div className="row">
        <div className="col-7">
          <GameCollection
            gameState={gameState}
            handleDeleteGame={handleDeleteGame}
          />
        </div>
        <div className="col-5">
          <GameCollectionAdd handleNewGame={handleNewGame} />
        </div>
      </div>
    </>
  );
};
