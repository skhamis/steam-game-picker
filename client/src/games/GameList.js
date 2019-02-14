import React from "react";
import Grid from "@material-ui/core/Grid";
import GameCard from "./GameCard";

function GameList({ gameList }) {
  if (gameList === null) {
    return null;
  }
  return (
    <div>
      <Grid container spacing={24} justify="center">
        {gameList.games.map((game, index) => {
          return (
            <Grid item key={index}>
              <GameCard game={game} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default GameList;
