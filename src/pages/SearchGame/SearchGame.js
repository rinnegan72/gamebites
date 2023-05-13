import React, { useState } from "react";
import { db } from "../../firebase/config";
import { getDocs, collection, where, query } from "firebase/firestore";
import "../Games/Games.css";
import "../Games/SingleGame.css";
import { EDITGAME, DELETEGAME } from "../../constants/routes";

const SearchGame = () => {
    const [queryGame, setQueryGame] = useState({
        title: "", sl_no: 0, publisher: ""
    });

    const [games, setGames] = useState([]);

    function handleTitleChange(e) {
        setQueryGame({
            ...queryGame,
            title: e.target.value
        });
    }

    function handleSlNoChange(e) {
        let value = e.target.value;
        if (value === "") {
            value = 0;
        } else {
            value = parseInt(value);
        }
        setQueryGame({
            ...queryGame,
            sl_no: value
        });
    }

    function handlePublisherChange(e) {
        setQueryGame({
            ...queryGame,
            publisher: e.target.value
        });
    }

    const handleButtonClick = async () => {
        // Clear the games state before running a new query
        setGames([]);
        const gamesRef = collection(db, 'games');
        let q = query(gamesRef);

        if (queryGame.sl_no) {
            q = query(q, where("sl_no", "==", queryGame.sl_no));
        }
        if (queryGame.publisher) {
            q = query(q, where("publisher", "==", queryGame.publisher));
        }

        if (queryGame.title) {
            q = query(q, where("title", "==", queryGame.title));
        }

        //console.log("handle", q);
        const querySnapshot = await getDocs(q);
        const gameList = [];
        if (querySnapshot) {
            querySnapshot.forEach((doc) => {
                gameList.push({
                    ...doc.data(), //spread operator
                    key: doc.id, // `id` given to us by Firebase
                });
                //console.log("For each Doc");
            });
            //console.log("Completed all docs");
            setGames(gameList);
        } else {
            //console.log("No such document!");
        }
    };

    return (
        <div style={{ marginTop: '100px', marginLeft: '50px' }} >
            <div style={{ display: 'flex' }}>
                <form
                    style={{ flex: 1 }}
                    onSubmit={event => {
                        event.preventDefault();
                        //console.log("onsubmit");
                    }}>
                    <label>
                        Search Parameters: <p></p>
                        Serial Number: {"\u00A0\u00A0"}
                        <input
                            value={query.sl_no}
                            onChange={handleSlNoChange}
                            type="number"
                        />
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        Title: {"\u00A0\u00A0"}
                        <input
                            style={{ width: "40%" }}
                            value={query.title}
                            onChange={handleTitleChange}
                        />
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        Publisher: {"\u00A0\u00A0"}
                        <input
                            value={query.publisher}
                            onChange={handlePublisherChange}
                        />
                    </label>
                    <p>
                    <button id="searchGameButton" onClick={handleButtonClick}>Search</button></p>
                    <p></p>
                </form>
            </div>
            <div>
                <div className="container">
                    {games.length > 0 ? (
                        games.map((game) => (
                            <div key={game.key} className="game">
                                <p>Game No: {game.sl_no}&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                    <a href={EDITGAME + "/" + game.key} style={{ color: 'black' }}>Edit</a>&nbsp; &nbsp; &nbsp; &nbsp;
                                    <a href={DELETEGAME + "/" + game.key} style={{ color: 'black' }}>Delete</a></p>

                                <h2>{game.title}</h2>
                                By <h3>{game.publisher}</h3>
                                <p dangerouslySetInnerHTML={{ __html: game.remarks.replace(/\n/g, '<br>') }} />
                                <p><img src={game.image_url} alt="Game cover" /></p>
                            </div>
                        ))
                    ) : (
                        <h1>No games to show</h1>
                    )}
                </div>
            </div>
        </div >
    );
};

export default SearchGame;