import React, { useMemo, useReducer, useState } from "react";
import { useLocation } from "react-router";
//React Router implementa un hook llamado useNavigate que nos va permitir movernos por las páginas y hacer
//redirecciones.
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/effect/useForm";
import { GameCard } from "../games/GameCard";
import { getGamesBySearch } from "../../selectores/getGamesBySearch";
import { GameCollectionItem } from "../../hooks/reducer/GameCollectionItem";

export const BuscadorScreen = () => {
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  console.log(juegosFiltrados.length);
  //Utilizamos el hook 'useLocation' para obtener la informació de la ubicación en la que
  //se encuentra el usuario en la aplicación.
  const location = useLocation();
  //Utilizamos la librería query-string para parsear el query string de la url.
  //Desestructuramos la variable 'busqueda' del query string.
  const { busqueda = "" } = queryString.parse(location.search);
  const [formValues, handleInputChange] = useForm({
    criterioBusqueda: busqueda,
  });

  const { criterioBusqueda } = formValues;
  //Utilizamos useMemo para memorizar la busqueda
  //const juegosFiltrados = useMemo(() => getGamesBySearch(busqueda), [busqueda]);
  //console.log(juegosFiltrados);
  //const juegosFiltrados = JSON.parse(localStorage.getItem("todos"));
  const navigate = useNavigate();
  const handleBusqueda = (e) => {
    e.preventDefault();
    console.log(criterioBusqueda);
    //Generamos el query string en la URL
    //navigate(`?busqueda=${criterioBusqueda}`);
  };

  const busquedaByDB = (e) => {
    console.log(criterioBusqueda);

    e.preventDefault();

    let urlBusqueda =
      "http://localhost:8585/games/busqueda/" + criterioBusqueda;

    fetch(urlBusqueda).then((res) => {
      res.json().then((result) => {
        setJuegosFiltrados(result);
      });
    });
  };

  return (
    <>
      <h1>Buscador</h1>
      <br />
      <div className="row">
        <div className="col-5">
          <h4>Mi Búsqueda</h4>
          <br />
          <form onSubmit={busquedaByDB}>
            <input
              type="text"
              className="form-control"
              name="criterioBusqueda"
              value={criterioBusqueda}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultado</h4>
          <br />
          {busqueda === "" && (
            <div className="alert alert-info">
              Indica el criterio de búsqueda...
            </div>
          )}
          {busqueda !== "" && juegosFiltrados.length === 0 && (
            <div className="alert alert-danger">
              No existe el juego: {busqueda}
            </div>
          )}
          {
            //Recorremos el resultado de la búsqueda de los juegos.
            juegosFiltrados.map((juego, i) => (
              <GameCollectionItem game={juego} index={i} />
            ))
          }
        </div>
      </div>
    </>
  );
};
