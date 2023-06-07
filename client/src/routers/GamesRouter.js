import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../componentes/comunes/Navbar";
import { VideojuegosScreen } from "../componentes/Videojuegos/VideojuegosScreen";
import { MiColeccionScreen } from "../componentes/Mi Coleccion/MiColeccionScreen";
import { BuscadorScreen } from "../componentes/buscador/BuscadorScreen";
import ShowLog from "../componentes/ShowLog";
export const GamesRouter = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/buscar" element={<BuscadorScreen />} />
          <Route exact path="/videojuegos" element={<VideojuegosScreen />} />
          <Route exact path="/micoleccion" element={<MiColeccionScreen />} />
          <Route exact path="/log" element={<ShowLog />} />
          <Route path="*" element={<Navigate to="/videojuegos" replace />} />
        </Routes>
      </div>
    </>
  );
};
