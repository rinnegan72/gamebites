import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import "./Games.css";
import { EDITGAME, DELETEGAME } from "../../constants/routes";

const Games = () => {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        //console.log("Entered useEffect");
        const getGamesFromFirebase = [];
        const gamesCollectionRef = collection(db, 'games');
        const q = query(gamesCollectionRef, orderBy("sl_no"));
        const gameDB = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getGamesFromFirebase.push({
                    ...doc.data(), //spread operator
                    key: doc.id, // `id` given to us by Firebase
                });
                //console.log("For each Doc");
            });
            //console.log("Completed all docs");
            setGames(getGamesFromFirebase);
            setLoading(false);
        });
        //console.log("Set value in  games variable");
        // return cleanup function
        return () => gameDB();
    }, [loading]); // empty dependencies array => useEffect only called once
    //console.log("File execution is starting here");
    if (loading) {
        return <div className="container"><h1>loading firebase data...</h1></div>;
    }

    return (
        <div className="top">
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
                    <h1>no games yet</h1>
                )}
            </div>
        </div>
    );
};

export default Games;