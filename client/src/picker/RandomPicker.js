import React, { useState } from "react";
import GameCard from "../games/GameCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function RandomPicker({ gameList }) {
  const [count, getNewGame] = useState(0);
  const game =
    gameList.games[Math.floor(Math.random() * gameList.games.length)];
  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
      spacing={24}
    >
      <Grid item>
        <Typography>And the game to play is...</Typography>
      </Grid>
      <Grid item>
        <GameCard game={game} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getNewGame(count + 1)}
        >
          Meh...not feelin it
        </Button>
      </Grid>
      {count > 5 ? (
        <Grid item>
          <Typography>
            You haven't been feeling it for {count} games...
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  );
}
export default RandomPicker;
