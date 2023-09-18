import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { FlagOutlined } from "@material-ui/icons";

const Tile = (props) => {
  const {
    tile,
    getNumberOfSurroundingMines,
    handleLose,
    updateTile,
    checkForWin,
    revealTile,
  } = props;
  const [icon, setIcon] = useState(
    <div>
      <br />
    </div>
  );

  const handleLeftClick = () => {
    if (tile.isRevealed) {
      return;
    }
    switch (tile.value) {
      case 0:
        revealTile(tile.row, tile.column);
        setIcon(
          <div>{getNumberOfSurroundingMines(tile.row, tile.column)}</div>
        );
        checkForWin();
        break;
      case 1:
        setIcon(<div>Mine</div>);
        handleLose();
        break;
      default:
        setIcon(
          <div>{getNumberOfSurroundingMines(tile.row, tile.column)}</div>
        );
        revealTile(tile.row, tile.column);
        checkForWin();
        break;
    }
  };

  const handleRightClick = () => {
    if (tile.isRevealed) {
      return;
    }

    if (tile.isFlagged) {
      setIcon(
        <div>
          <br />
        </div>
      );
    } else {
      setIcon(<FlagOutlined />);
    }
    updateTile(tile.row, tile.column);
  };

  return (
    <Button
      variant="contained"
      style={{
        color: `${tile.color}`,
      }}
      onClick={() => handleLeftClick()}
      onContextMenu={() => handleRightClick()}
    >
      {tile.isRevealed ? (
        tile.value === 1 ? (
          <div>Mine</div>
        ) : (
          <div>{getNumberOfSurroundingMines(tile.row, tile.column, false)}</div>
        )
      ) : (
        icon
      )}
    </Button>
  );
};

export default Tile;
