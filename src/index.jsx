import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {BrowserRouter, Routes,Route } from "react-router-dom"

// import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Login from './Routes/Login'
// import Footer from "./Components/Footer";
import App from './App'
import Detail from './Routes/Detail'
import NoPage from "./Routes/NoPage";
import { DarkProvider} from './hooks/useDark'
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));


//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  
  <DarkProvider >
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}  >
            <Route index element={<Home />}  />
            <Route path='login' element={<Login/>}  />
            <Route path='dentist/:id' element={<Detail/>} />
            <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </DarkProvider>

);
