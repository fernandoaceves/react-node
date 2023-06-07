import React from "react";
import { useFetch } from "../custom/useFetch";

//Este componente recibe como parámetro el todo a mostrar, su índice, y las referencias a las funciones handle.
export const GameCollectionItem = ({ game, index, handleDeleteGame }) => {
  const { loading, info } = useFetch(
    "https://api.rawg.io/api/games/" +
      game.desc +
      "?key=a7717c471e824b60a36ccf2784286f56"
  );
  const { name_original, background_image, rating } = !!info && info;

  return (
    <>
      {loading ? (
        <div className="alert alert-info text-center">Loading...</div>
      ) : (
        <li key={game.id} className="list-group-item card flex-list">
          <div className="card">
            <img className="card-img-top" src={background_image} />
            <div className="card-body">
              <h5 className="card-title">{name_original}</h5>
              <p>Rating: {rating}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteGame(game.id)}
            >
              Borrar
            </button>
          </div>
        </li>
      )}
    </>
  );
};
