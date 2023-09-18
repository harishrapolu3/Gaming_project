import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

const Header = (props) => {
  const {
    rows,
    columns,
    difficulty,
    isGameStarted,
    handleRowsChange,
    handleColumnsChange,
    handleDifficultyChange,
    handleStartGame,
    handleReset,
  } = props;
  const [showForm, setShowForm] = useState(false);

  const handleStartNewGame = () => {
    setShowForm(true);
    handleStartGame();
    setShowForm(false);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "16px" }}>
      <Typography variant="h4">Minesweeper</Typography>
      {showForm ? (
        <div>
          <Typography variant="h4">Enter number of rows and columns</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6">Rows</Typography>
              <input type="number" value={rows} onChange={handleRowsChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Columns</Typography>
              <input
                type="number"
                value={columns}
                onChange={handleColumnsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Difficulty</Typography>
              <select value={difficulty} onChange={handleDifficultyChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Grid>
          </Grid>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartNewGame}
          >
            Start Game
          </Button>
        </div>
      ) : isGameStarted ? (
        <div>
          {/* Rules */}
          <Typography variant="body1">
            Click on a cell to reveal it. If you click on a cell with a mine,
            you lose. If you click on a cell without a mine, you can click on
            the adjacent cells to reveal them.
          </Typography>
          <br />
          <Typography variant="body1">
            Right click on a cell to mark it as a mine. If you mark a cell as a
            mine, you can unmark it by right clicking on it again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleReset();
              setShowForm(false);
            }}
          >
            Reset Game
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
        >
          Start Game
        </Button>
      )}
    </div>
  );
};

export default Header;
