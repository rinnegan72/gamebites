import { useState, useEffect } from 'react';
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useParams, useNavigate } from "react-router-dom";
import "./DeleteGame.css";
import { GAMES } from "../../constants/routes";


const DeleteGame = () => {
  // const [game, setGame] = useState({});
  const [game, setGame] = useState({
    title: "", image_url: "",
    sl_no: 0, publisher: "", remarks: ""
  });

  const { key } = useParams();

  const handleButtonClick = () => {

    const gameRef = doc(db, "games", key);
    deleteDoc(gameRef, game).then(function () {
      console.log("Document deleted with ID: ", game.sl_no);
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!key) {
      // Reset game state or navigate to another page
      setGame({});
      navigate(GAMES); 
    }
    const gameRef = doc(db, "games", key);
    const fetchGame = async () => {
      const gameDoc = await getDoc(gameRef);
      if (gameDoc.exists()) {
        setGame(gameDoc.data());
      } else {
        console.log("No such document!");        
      }
    };
    fetchGame();
  }, [key]);

  return (
    <div>
      <form>
        <div className="container">
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
              <div key={game.id} className="game">
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

