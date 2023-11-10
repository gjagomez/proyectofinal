import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import Principal from "./pages/Principal";
import Altausuarios from "./pages/Altausuarios";
import Productos from "./pages/Productos";
import Reportes from "./pages/Reporte";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemplatePage from "./pages/Loyout";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      {/* Ruta para la página de inicio de sesión */}
      <Route
        path="/"
        element={
          // Utiliza la página de plantilla para envolver la página de inicio de sesión

          <Login />
        }
      />

      {/* Ruta para la página principal */}
      <Route
        path="/principal"
        element={
          // Utiliza la página de plantilla para envolver la página principal
          <TemplatePage>
            <Principal />
          </TemplatePage>
        }
      />
      <Route
        path="/users"
        element={
          // Utiliza la página de plantilla para envolver la página principal
          <TemplatePage>
            <Altausuarios />
          </TemplatePage>
        }
      />
      <Route
        path="/productos"
        element={
          // Utiliza la página de plantilla para envolver la página principal
          <TemplatePage>
            <Productos />
          </TemplatePage>
        }
      />
      <Route
        path="/reportes"
        element={
          // Utiliza la página de plantilla para envolver la página principal
          <TemplatePage>
            <Reportes />
          </TemplatePage>
        }
      />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
