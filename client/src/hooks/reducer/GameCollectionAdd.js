import React, { useEffect, useState } from "react";
import { useForm } from "../custom/useForm";
import { useFetch } from "react";

export const GameCollectionAdd = ({ handleNewGame }) => {
  const initialValues = {
    id_game: "",
    nombre_game: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleAddGame = (e) => {
    //Evitamos el refresh del navegador con la función preventDefault()
    e.preventDefault();
    //Validamos que la descripción tenga información para poderlo agregar a la lista.
    if (values.id_game.trim().length === 0) {
      return;
    }

    const nuevoGame = {
      id: new Date().getTime(),
      desc: values.id_game,
      name: values.nombre_game,
    };
    //Creamos el nuevo todo.
    handleNewGame(nuevoGame);
    //Reseteamos los valores del formulario.
    setValues(initialValues);
  };

  return (
    <>
      <h4>Agregar Juego</h4>
      <hr />
      <form onSubmit={handleAddGame}>
        {
          //En este input text estamos igualando value a la variable 'descripcion' que
          // obtuvimos al utilizar el custom hook useForm
        }
        <input
          type="text"
          name="id_game"
          className="form-control"
          placeholder="Indica el id del juego..."
          autoComplete="off"
          value={values.id_game}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nombre_game"
          className="form-control"
          placeholder="Indica el nombre del juego..."
          autoComplete="off"
          value={values.nombre_game}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-outline-primary mt-1 btn-block"
        >
          Agregar
        </button>
      </form>
    </>
  );
};
