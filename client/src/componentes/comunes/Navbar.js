import React, { useContext } from "react";
import { UserContext } from "../../hooks/context/UserContex";

//Con Link y NavLink vamos a poder navegar entre las diferentes páginas utilizando el Router de React.
import { Link, NavLink } from "react-router-dom";
export const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark pl-10">
      <Link className="navbar-brand" to="/">
        {user.name}
      </Link>
      <div className="navbar-collapse">
        <div className="navbar-nav">
          {/*
La propiedad 'to' sirve para indicar el route al que nos vamos a dirigir al hacer clic en la liga y con esto identifica qué componente
va cargar para ser mostrado en la página. La propiedad 'exact' indica que debe ser la ruta exacta la que se tiene que indicar y enviar al Router.
*/}
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-item nav-link"
            }
            exact="true"
            to="/videojuegos"
          >
            Videojuegos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-item nav-link"
            }
            exact="true"
            to="/micoleccion"
          >
            Mi Colección
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-item nav-link"
            }
            exact="true"
            to="/buscar"
          >
            Buscar
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-item nav-link"
            }
            exact="true"
            to="/log"
          >
            Log
          </NavLink>
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-item nav-link"
            }
            exact="true"
            to="/login"
          >
            Salir
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
