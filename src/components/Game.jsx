import React, { useState } from "react";
import Header from "./Header";
import Gameboard from "./Gameboard";
import { Button, Modal } from "@material-ui/core";

const Game = () => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleRowsChange = (event) => {
    if (!validateInput(event.target.value)) {
      alert("Please enter a number between 1 and 100");
      return;
    }
    setRows(event.target.value);
  };

  const handleColumnsChange = (event) => {
    if (!validateInput(event.target.value)) {
      alert("Please enter a number between 1 and 100");
      return;
    }
    setColumns(event.target.value);
  };

  const validateInput = (input) => {
    return !isNaN(input) && input > 0 && input <= 100;
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleWin = () => {
    setIsGameOver(true);
    setIsGameWon(true);
  };

  const handleLose = () => {
    setIsGameOver(true);
  };

  const handleReset = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
    setIsGameWon(false);
  };

  return (
    <div>
      <Header
        rows={rows}
        columns={columns}
        difficulty={difficulty}
        isGameStarted={isGameStarted}
        handleRowsChange={handleRowsChange}
        handleColumnsChange={handleColumnsChange}
        handleDifficultyChange={handleDifficultyChange}
        handleStartGame={handleStartGame}
        handleReset={handleReset}
      />
      {isGameStarted && (
        <Gameboard
          rows={rows}
          columns={columns}
          difficulty={difficulty}
          handleWin={handleWin}
          handleLose={handleLose}
        />
      )}

      <Modal
        open={isGameOver || isGameWon}
        onClose={() => {
          setIsGameOver(false);
          setIsGameWon(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className="modal-container"
          style={{ textAlign: "center", backgroundColor: "white" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Courier New",
              fontSize: "50px",
              color: isGameWon ? "green" : "red",
            }}
            id="simple-modal-title"
          >
            {isGameWon ? "You Won!" : "You Lost!"}
          </h2>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Courier New",
              fontSize: "20px",
              color: isGameWon ? "green" : "red",
            }}
            id="simple-modal-description"
          >
            {isGameWon ? "You Won!" : "You Lost!"}
          </p>
          <iframe
            title="game-end-animation"
            src={
              isGameWon
                ? "https://giphy.com/embed/6brH8dM3zeMyA"
                : "https://giphy.com/embed/RHEGP4TpkhrQTFCZE4"
            }
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={() => {
              setIsGameOver(false);
              setIsGameStarted(false);
              setIsGameWon(false);
            }}
          >
            Play Again
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={() => {
              setIsGameOver(false);
              setIsGameWon(false);
            }}
          >
            Quit/View Board
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
