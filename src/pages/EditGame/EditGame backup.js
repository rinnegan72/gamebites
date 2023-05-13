import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useParams, useNavigate } from "react-router-dom";
import "../Games/SingleGame.css";
import { GAMES } from "../../constants/routes";


const EditGame = () => {

  const { key } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    title: "", image_url: "",
    sl_no: 0, publisher: "", remarks: ""
  });
  // const [game, setGame] = useState({});
  function handleTitleChange(e) {
    setGame({
      ...game,
      title: e.target.value
    });
  }

  function handleImageUrlChange(e) {
    setGame({
      ...game,
      image_url: e.target.value
    });
  }

  function handleSlNoChange(e) {
    let value = e.target.value;
    if (value === "") {
      value = 0;
    } else {
      value = parseInt(value);
    }
    setGame({
      ...game,
      sl_no: value
    });
  }

  function handlePublisherChange(e) {
    setGame({
      ...game,
      publisher: e.target.value
    });
  }

  function handleRemarksChange(e) {
    setGame({
      ...game,
      remarks: e.target.value
    });
  }

  const handleButtonClick = () => {
    const gameRef = doc(db, "games", key);
    setDoc(gameRef, game).then(function () {
      key = false;
      navigate(GAMES);
      console.log("Document written with ID: ", gameRef.id, "  ", key);
    })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  };
  <form onSubmit={(event) => {
    event.preventDefault();
    key = false;
    console.log("onsubmit", key);
  }}>
  </form>
  useEffect(() => {
    console.log("useEffect", key);
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
      <form>
        <div className="pageContainer">
          <div className="section">
            <label>
              Serial Number: {"\u00A0\u00A0"}
              <input
                value={game.sl_no}
                onChange={handleSlNoChange}
                type="number"
              />
            </label>
            <p></p>
            <label>
              Title: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.title}
                onChange={handleTitleChange}
              />
            </label>
            <p></p>
            <label>
              Publisher: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.publisher}
                onChange={handlePublisherChange}
              />
            </label>
            <p></p>
            <label>
              Remarks: {"\u00A0\u00A0"}
              <textarea
                style={{ width: "100%" }}
                rows="5"
                value={game.remarks}
                onChange={handleRemarksChange}
              />
            </label>
            <p></p>
            <label>
              Image URL: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                value={game.image_url}
                onChange={handleImageUrlChange}
              />
            </label>
            <p></p><button onClick={handleButtonClick}>Save</button>
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

export default EditGame;
