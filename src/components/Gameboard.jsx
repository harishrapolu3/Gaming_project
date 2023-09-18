import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Tile from "./Tile";

const Gameboard = (props) => {
  const { rows, columns, difficulty, handleLose, handleWin } = props;
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      console.log("Rows: " + rows);
      console.log("Columns: " + columns);
      console.log("Difficulty: " + difficulty);

      if (!loading) {
        return;
      }

      var tiles = [];
      while (getTotalMineCount(tiles) === 0) {
        tiles = [];
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            tiles.push({
              row: row,
              column: column,
              value: generateTileValue(),
              isRevealed: false,
              isFlagged: false,
              color: "blue",
            });
          }
        }
      }

      setTiles((oldTiles) => [...oldTiles, ...tiles]);
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const generateTileValue = () => {
    var mineLikelyhood = 0.1;
    switch (difficulty) {
      case "easy":
        mineLikelyhood = Math.floor(Math.random() * 7);
        if (mineLikelyhood === 0) {
          return 1;
        }
        return 0;
      case "medium":
        mineLikelyhood = Math.floor(Math.random() * 5);
        if (mineLikelyhood === 0) {
          return 1;
        }
        return 0;
      case "hard":
        mineLikelyhood = Math.floor(Math.random() * 3);
        if (mineLikelyhood === 0) {
          return 1;
        }
        return 0;
      default:
        return 0;
    }
  };

  const getMineCount = (row, column, checkSurrounding = true) => {
    let mineCount = 0;

    // check top left
    if (row > 0 && column > 0) {
      if (tiles[(row - 1) * columns + (column - 1)].value === 1) {
        mineCount++;
      }
    }

    // check top
    if (row > 0) {
      if (tiles[(row - 1) * columns + column].value === 1) {
        mineCount++;
      }
    }

    // check top right
    if (row > 0 && column < columns - 1) {
      if (tiles[(row - 1) * columns + (column + 1)].value === 1) {
        mineCount++;
      }
    }

    // check left
    if (column > 0) {
      if (tiles[row * columns + (column - 1)].value === 1) {
        mineCount++;
      }
    }

    // check right
    if (column < columns - 1) {
      if (tiles[row * columns + (column + 1)].value === 1) {
        mineCount++;
      }
    }

    // check bottom left
    if (row < rows - 1 && column > 0) {
      if (tiles[(row + 1) * columns + (column - 1)].value === 1) {
        mineCount++;
      }
    }

    // check bottom
    if (row < rows - 1) {
      if (tiles[(row + 1) * columns + column].value === 1) {
        mineCount++;
      }
    }

    // check bottom right
    if (row < rows - 1 && column < columns - 1) {
      if (tiles[(row + 1) * columns + (column + 1)].value === 1) {
        mineCount++;
      }
    }

    if (mineCount === 0) {
      if (checkSurrounding) revealAdjacentTiles(row, column);
    }

    return mineCount;
  };

  const revealAdjacentTiles = (row, column) => {
    if (getMineCount(row, column, false) > 0) {
      return;
    }

    /* eslint-disable no-labels */

    // check top left
    tilecheck: if (row > 0 && column > 0) {
      if (tiles[(row - 1) * columns + (column - 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row - 1) * columns + (column - 1)].value === 0) {
        tiles[(row - 1) * columns + (column - 1)].isRevealed = true;
        revealAdjacentTiles(row - 1, column - 1);
      }
    }

    // check top
    tilecheck: if (row > 0) {
      if (tiles[(row - 1) * columns + column].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row - 1) * columns + column].value === 0) {
        tiles[(row - 1) * columns + column].isRevealed = true;
        revealAdjacentTiles(row - 1, column);
      }
    }

    // check top right
    tilecheck: if (row > 0 && column < columns - 1) {
      if (tiles[(row - 1) * columns + (column + 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row - 1) * columns + (column + 1)].value === 0) {
        tiles[(row - 1) * columns + (column + 1)].isRevealed = true;
        revealAdjacentTiles(row - 1, column + 1);
      }
    }

    // check left
    tilecheck: if (column > 0) {
      if (tiles[row * columns + (column - 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[row * columns + (column - 1)].value === 0) {
        tiles[row * columns + (column - 1)].isRevealed = true;
        revealAdjacentTiles(row, column - 1);
      }
    }

    // check right
    tilecheck: if (column < columns - 1) {
      if (tiles[row * columns + (column + 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[row * columns + (column + 1)].value === 0) {
        tiles[row * columns + (column + 1)].isRevealed = true;
        revealAdjacentTiles(row, column + 1);
      }
    }

    // check bottom left
    tilecheck: if (row < rows - 1 && column > 0) {
      if (tiles[(row + 1) * columns + (column - 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row + 1) * columns + (column - 1)].value === 0) {
        tiles[(row + 1) * columns + (column - 1)].isRevealed = true;
        revealAdjacentTiles(row + 1, column - 1);
      }
    }

    // check bottom
    tilecheck: if (row < rows - 1) {
      if (tiles[(row + 1) * columns + column].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row + 1) * columns + column].value === 0) {
        tiles[(row + 1) * columns + column].isRevealed = true;
        revealAdjacentTiles(row + 1, column);
      }
    }

    // check bottom right
    tilecheck: if (row < rows - 1 && column < columns - 1) {
      if (tiles[(row + 1) * columns + (column + 1)].isRevealed) {
        break tilecheck;
      }
      if (tiles[(row + 1) * columns + (column + 1)].value === 0) {
        tiles[(row + 1) * columns + (column + 1)].isRevealed = true;
        revealAdjacentTiles(row + 1, column + 1);
      }
    }

    setTiles((oldTiles) => [...oldTiles]);
  };

  const getTotalMineCount = (tiles) => {
    let mineCount = 0;

    tiles.forEach((tile) => {
      if (tile.value === 1) {
        mineCount++;
      }
    });

    return mineCount;
  };

  const handleLoseLogic = () => {
    tiles.forEach((tile) => {
      if (tile.value === 1 && tile.isFlagged) {
        tile.isRevealed = true;
      }
    });

    revealAllMines();

    handleLose();
  };

  const revealAllMines = () => {
    tiles.forEach((tile) => {
      if (tile.value === 1) {
        tile.isRevealed = true;
        tile.color = "red";
      }
    });
    setTiles((oldTiles) => [...oldTiles]);
  };

  const updateTileToFlagged = (row, column) => {
    const tile = tiles.find(
      (tile) => tile.row === row && tile.column === column
    );
    tile.isFlagged = !tile.isFlagged;
    setTiles((oldTiles) => [...oldTiles]);
  };

  const handleWinLogic = () => {
    // check if all safe tiles are revealed
    let safeTiles = 0;
    tiles.forEach((tile) => {
      if (tile.value === 0 && tile.isRevealed) {
        safeTiles++;
      }
    });

    console.log(tiles, safeTiles);

    if (safeTiles === rows * columns - getTotalMineCount(tiles)) {
      handleWin();
    }
  };

  const revealTile = (row, column) => {
    const tile = tiles.find(
      (tile) => tile.row === row && tile.column === column
    );
    if (tile.isRevealed) return;
    if (tile.isFlagged) return;

    tile.isRevealed = true;

    setTiles((oldTiles) => [...oldTiles]);
  };

  const getFlagCount = () => {
    let flagCount = 0;

    tiles.forEach((tile) => {
      if (tile.isFlagged) {
        flagCount++;
      }
    });

    return flagCount;
  };

  const setUpGameboard = () => {
    var gameboard = [];
    for (var i = 0; i < columns; i++) {
      gameboard.push(
        <Grid iem key={i}>
          {tiles.slice(i * columns, (i + 1) * columns).map((tile) => {
            return (
              <Tile
                key={tile.row * columns + tile.column}
                tile={tile}
                setTiles={setTiles}
                getNumberOfSurroundingMines={getMineCount}
                handleLose={handleLoseLogic}
                updateTile={updateTileToFlagged}
                checkForWin={handleWinLogic}
                revealTile={revealTile}
              />
            );
          })}
        </Grid>
      );
    }

    return (
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Flags: {getTotalMineCount(tiles) - getFlagCount()}
          </Typography>
        </Grid>
        {gameboard}
      </Grid>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? <div>Loading...</div> : setUpGameboard()}
    </div>
  );
};

export default Gameboard;
