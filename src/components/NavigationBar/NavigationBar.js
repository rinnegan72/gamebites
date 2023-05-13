import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import * as ROUTES from "../../constants/routes";

const NavigationBar = () => {
  return (
    <header className="NavigationBar">
      <nav>
        <div style={{ textAlign: "center", fontSize: "24px" }}>GameCritic 
        <span style={{ fontSize: "18px" }}>- Sharing some interesting games</span></div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={ROUTES.ADDGAME}>
          Add a game
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={ROUTES.GAMES}>
          View all games
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={ROUTES.SEARCHGAME}>
          Search game
        </Link>
        <p></p>
      </nav>
    </header>
  );
};

export default NavigationBar;