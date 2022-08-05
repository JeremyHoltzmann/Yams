import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from "./components/game";
import Homepage from "./components/homepage";
import Login from "./components/login";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import playerList from "./reducer/playerName.reducer";
import token from "./reducer/token";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: { playerList, token } });

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/setupGame" element={<Homepage />}></Route>
          <Route exact path="/game" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
