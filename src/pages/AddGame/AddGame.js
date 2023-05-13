import { useState, useEffect } from 'react';
import { collection, doc, setDoc, orderBy, limit, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useNavigate } from "react-router-dom";
import "../Games/SingleGame.css";
import { GAMES } from "../../constants/routes";

var { recordAdded } = false;
const AddGame = () => {
  const [game, setGame] = useState({
    title: "Title", image_url: "https:",
    sl_no: 0, publisher: "Publisher", remarks: "Critical review"
  });



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
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    // Add a new document with a generated id
    const gameRef = doc(collection(db, "games"));

    // later...
    await setDoc(gameRef, game).then(function () {
      console.log("Document written with ID: ", gameRef.id);
      recordAdded = true;
      //console.log("setDocs",recordAdded)
      navigate(GAMES);
    });
  };
  useEffect(() => {
    //console.log("UseEffect",recordAdded);       
    if (!recordAdded) {
      recordAdded = false; 
      const fetchGame = async () => {
        const query2 = query(collection(db, "games"), orderBy("sl_no", "desc"), limit(1));
        const querySnapshot = await getDocs(query2);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          //console.log(doc.data().sl_no);
          const updatedData = {
            ...doc,
            sl_no: doc.data().sl_no + 1
          };          
          //console.log(updatedData.sl_no);
          setGame(updatedData);        
        } else {
          doc = {
            title: "Title", image_url: "https:",
            sl_no: 0, publisher: "Publisher", remarks: "Critical review"
          };
          console.log("No such document!");
          console.log(doc.data().sl_no);
          setGame(doc.data());
        }
      };
      fetchGame();
    }
    else {
      console.log("Record added");
      navigate(GAMES);
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={AddGame}>
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
//                value={game.title}
                onChange={handleTitleChange}
              />
            </label>
            <p></p>
            <label>
              Publisher: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                //value={game.publisher}
                onChange={handlePublisherChange}
              />
            </label>
            <p></p>
            <label>
              Image URL: {"\u00A0\u00A0"}
              <input
                style={{ width: "100%" }}
                //value={game.image_url}
                onChange={handleImageUrlChange}
              />
            </label>
            <p></p>
            <label>
              Remarks: {"\u00A0\u00A0"}
              <textarea
                style={{ height: "100px", width: "100%" }}
                //value={game.remarks}
                onChange={handleRemarksChange}
              ></textarea>
            </label>
            <p></p>
            <button id="addGameButton" onClick={handleButtonClick}>Submit</button>
          </div>
          <div className="section">
            <div className="gameContainer">
              <div key={game.id} className="game2">
                <p>Game No: {game.sl_no ? game.sl_no : 0}</p>
                <h2>{game.title}</h2>
                By <h3>{game.publisher}</h3>
                <p dangerouslySetInnerHTML={{ __html: game.remarks ? game.remarks.replace(/\n/g, '<br>') : '' }} />
                <p><img src={game.image_url} alt="Game cover" /></p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGame;
