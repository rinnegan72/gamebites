import React from "react";
//If you’re using react-router-dom v6 or above, you should use the Routes component instead of the Switch component.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import AddGame from "./pages/AddGame/AddGame";
import Games from "./pages/Games/Games";
import EditGame from "./pages/EditGame/EditGame";
import DeleteGame from "./pages/DeleteGame/DeleteGame";
import SearchGame from "./pages/SearchGame/SearchGame";

const App = () => {
  const { isLoading } = true;
  return isLoading ? (
    <h1>hold on, loading...</h1>
  ) : (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.ADDGAME} element={<AddGame />} />
        <Route path={ROUTES.GAMES} element={<Games />} />
        <Route path={ROUTES.SEARCHGAME} element={<SearchGame />} />
        <Route path={ROUTES.EDITGAME + "/:key"} element={<EditGame />} />
        <Route path={ROUTES.DELETEGAME + "/:key"} element={<DeleteGame />} />
      </Routes>
    </Router>
  );
};

export default App;
