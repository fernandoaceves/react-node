export const getGamesBySearch = (busqueda = "") => {
  let juegos = JSON.parse(localStorage.getItem("todos"));

  if (busqueda === "") {
    return [];
  }
  return juegos.filter(
    (juego) => juego.desc === busqueda
    //console.log(juego.desc)
  );
};
