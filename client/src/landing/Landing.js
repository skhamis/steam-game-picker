import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import gameImage from "../images/game_example.png";

function Landing() {
  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
      spacing={24}
    >
      <Grid item>
        <Typography variant="h4">
          {" "}
          Getting chills deciding the next game to play after the Winter Sale?
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          Feeling the heat after buying too many games on Summer Sale?
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Click the top right and sign in with steam and let this rando tool
          choose for you!{" "}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Example...</Typography>
        <Paper>
          <img src={gameImage} height={500} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Landing;
