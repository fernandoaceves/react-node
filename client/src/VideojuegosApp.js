import React, { useState, useContext } from "react";
import { AgregaGenero } from "./componentes/AgregarGenero";
import { ResultadoVideojuegos } from "./componentes/ResultadoVideojuegos";
import { InfoVideojuegos } from "./componentes/InfoVideojuegos";
import { UserContext } from "./hooks/context/UserContex";

export const VideojuegosApp = () => {
  //Utilizamos el hook useState para inicializar la lista de generos de videojuegos.
  const [generos, setGeneros] = useState(["action"]);

  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Gamebook</h1>
          <p className="lead">
            ¡Bienvenido a la página donde podrás consultar información de
            videojuegos!
          </p>
        </div>
      </div>
      <AgregaGenero setGeneros={setGeneros} />
      <ol className="list-group list-group-numbered">
        {generos.map((genero) => {
          return <InfoVideojuegos key={genero} genero={genero} />;
        })}
      </ol>
    </>
  );
};
