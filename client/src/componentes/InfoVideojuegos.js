import React, { useEffect, useState } from "react";

export const InfoVideojuegos = ({ genero }) => {
  useEffect(() => {
    getInfoVideojuegos();
  }, []);

  const [infoJuegos, setInfoJuegos] = useState([]);

  const getInfoVideojuegos = async () => {
    const url =
      "https://api.rawg.io/api/games?key=2f53efa226014541b575f4dbc198afa9&genres=" +
      encodeURI(genero);

    const respuesta = await fetch(url);

    const { results } = await respuesta.json();

    const juegos = results.map((juego) => {
      return {
        id: juego.id,
        nombre: juego.name,
        imagen: juego.background_image,
        rating: juego.rating,
        metacritic: juego.metacritic,
      };
    });

    setInfoJuegos(juegos);
    //console.log(juegos);
  };

  return (
    <>
      <h3 className="card-title">{genero}</h3>
      {/* 
  Creamos la lista de juegos con la información que recuperamos de la invocación del api de RAWG, 
   utilizando la variable infoJuegos que obtuvimos en la desestructuración del hook useState. 
     */}
      <ol className="list-group flex-list">
        {
          //Desestructuramos el objeto para obtener el id y el nombre del juego.
          infoJuegos.map(({ id, nombre, rating, imagen, metacritic }) => (
            <div className="card" key={id}>
              <img className="card-img-top" src={imagen} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <p>Rating: {rating}</p>
                <p className="card-text">Metacritic: {metacritic}</p>
              </div>
            </div>
          ))
        }
      </ol>
    </>
  );
};
