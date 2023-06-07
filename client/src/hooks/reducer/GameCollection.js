import React from "react";
import { GameCollectionItem } from "./GameCollectionItem";
//Componente para la lista de Todos. Recibe como argumentos el todoState y los métodos handleDeleteTodo
// y handleCompleteTodo
export const GameCollection = ({ gameState, handleDeleteGame }) => {
  return (
    <ul className="list-group list-group-flush">
      {gameState.map((game, i) => (
        <GameCollectionItem
          game={game}
          index={i}
          handleDeleteGame={handleDeleteGame}
        />
      ))}
    </ul>
  );
};
