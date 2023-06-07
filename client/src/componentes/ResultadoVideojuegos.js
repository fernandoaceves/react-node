import React, { useEffect, useState } from "react";

//Recibe como argumento el género que se va utilizar para hacer la búsqueda de los videojuegos
// utilizando el API de RAWG
export const ResultadoVideojuegos = ({ genero }) => {
  //Invocamos el api de RAWG para obtener los videojuegos del género proporcionado en los parámetros del
  // componente.
  //Utilizamos useEffect para invocar la función getVideojuegos.
  useEffect(() => {
    getVideojuegos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Creamos el estado del componente con useState
  const [infoJuegos, setInfoJuegos] = useState([]);

  const getVideojuegos = async () => {
    //URL del api de RAWG que validamos en postman
    const url =
      "https://api.rawg.io/api/games?key=2f53efa226014541b575f4dbc198afa9&genres=" +
      encodeURI(genero);
    //Utilizamos Fetch API para invocar la url.
    const respuesta = await fetch(url);
    //Recuperamos el JSON de la respuesta, el cual contiene la información de los videojuegos.
    const { results } = await respuesta.json();
    //Obtenemos solamente la información que vamos a necesitar del json de la respuesta.
    const juegos = results.map((juego) => {
      return {
        id: juego.id,
        nombre: juego.name,
        imagen: juego.background_image,
        rating: juego.rating,
        metacritic: juego.metacritic,
      };
    });
    //Invocamos el metodo setInfoJuegos que obtivimos con la desestructuración del hook useState
    setInfoJuegos(juegos);
    console.log(juegos);
  };

  return (
    <>
      <h3 className="card-title">{genero}</h3>
      {/* 
  Creamos la lista de juegos con la información que recuperamos de la invocación del api de RAWG, 
   utilizando la variable infoJuegos que obtuvimos en la desestructuración del hook useState. 
     */}
      <ol className="list-group">
        {
          //Desestructuramos el objeto para obtener el id y el nombre del juego.
          infoJuegos.map(({ id, nombre, imagen }) => (
            <li key={id} className="list-group-item">
              {nombre}
            </li>
          ))
        }
      </ol>
    </>
  );
};
