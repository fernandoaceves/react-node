import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/context/UserContex";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState("");
  const [values, setValues] = useState([]);

  useEffect(() => {
    //.then((data) => setData(data.message));
  }, []);

  const validateCredentials = () => {
    let user = document.getElementById("usuario").value;
    let password;
    let urlUser = "http://localhost:8585/users/" + user;

    fetch(urlUser).then((res) =>
      res.json().then((result) => {
        validate((password = result["contraseña"]), user);
      })
    );
  };

  const validate = (password, user) => {
    let passwordForm = document.getElementById("password").value;

    if (passwordForm === password) {
      setUser({
        id: 123,
        name: user,
      });
      registerEvent({ event: "Success access for the user", user: user });
      navigate("/");
    } else {
      alert("Datos incorrectos");
    }
  };

  const registerEvent = (event) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    };

    fetch("http://localhost:8585/events", requestOptions).then((response) =>
      response.json()
    );
  };

  return (
    <>
      <div className="container">
        <h1>Bienvenido</h1>
        <br />
        <form
          onSubmit={validateCredentials}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label htmlFor="email" className="pl-5">
              Usuario
            </label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder="usuario"
              className=" input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="input"
            />
          </div>
        </form>
        <button className="btn btn-primary" onClick={validateCredentials}>
          Ingresar
        </button>
      </div>
    </>
  );
};
