import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import "./app.css";
import LoginPro from "./administration/pages/LoginPro";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para login */}
        <Route path="/login" element={<LoginPro />} />
        
        {/* Rutas del sistema principal */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
