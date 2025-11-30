import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import Welcome from "./pages/Welcome"
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router= createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={"/"} element={<Welcome/>}></Route>
            <Route path={"/Login"} element={<Login/>}></Route>
            <Route path={"/Marketplace"} element={<Marketplace/>}></Route>
            <Route path={"/Register"} element={<Register/>}></Route>
            <Route path={"/Profile"} element={<Profile/>}></Route>
            <Route path={"/CreatePost"} element={<CreatePost/>}></Route>
        </>
    )
)

root.render(
  <React.StrictMode>
      <RouterProvider router={router}>
          <App/>
      </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
