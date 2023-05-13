import { useState, useEffect } from 'react';
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useParams, useNavigate } from "react-router-dom";
import "../Games/SingleGame.css";
import { GAMES } from "../../constants/routes";


const DeleteGame = () => {
  const [game, setGame] = useState({
    title: "", image_url: "",
    sl_no: 0, publisher: "", remarks: ""
  });

  const { key } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const gameRef = doc(db, "games", key);
    await deleteDoc(gameRef, game).then(function () {
      console.log("Document deleted with ID: ", game.sl_no);
      navigate(GAMES);
    });
  };
  useEffect(() => {
    const gameRef = doc(db, "games", key);
    const fetchGame = async () => {
      const gameDoc = await getDoc(gameRef);
      if (gameDoc.exists()) {
        setGame(gameDoc.data());
      } else {
        console.log("No such document!");
        navigate(GAMES);
      }
    };
    fetchGame();
  }, [key, navigate]);

  return (
    <div>
      <form onSubmit={event => {
        event.preventDefault();
        //console.log("onsubmit", key);
      }}>
        <div className="pageContainer">
          <div className="section">
            <label>
              Serial Number: {"\u00A0\u00A0"}
              <input
                value={game.sl_no}
                type="number"
                readOnly
              />
            </label>
            <p></p>
            <label>
              Title: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.title}
                readOnly
              />
            </label>
            <p></p>
            <label>
              Publisher: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.publisher}
                readOnly
              />
            </label>
            <p></p>
            <label>
              Remarks: {"\u00A0\u00A0"}
              <textarea
                style={{ width: "100%" }}
                rows="5"
                value={game.remarks}
                readOnly
              />
            </label>
            <p></p>
            <label>
              Image URL: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.image_url}
                readOnly
              />
            </label>
            <p></p><button onClick={handleButtonClick}>Delete</button>
          </div>
          <div className="section">
            <div className="gameContainer">
              <div key={game.id} className="game2">
                <p>Game No: {game.sl_no === 0 ? "" : game.sl_no}</p>
                <h2>{game.title}</h2>
                By <h3>{game.publisher}</h3>
                <p dangerouslySetInnerHTML={{ __html: game.remarks.replace(/\n/g, '<br>') }} />
                <p><img src={game.image_url} alt="Game cover" /></p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteGame;

