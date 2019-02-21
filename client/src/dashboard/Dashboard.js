import React, { useState, useEffect } from "react";
import GameList from "../games/GameList";
import RandomPicker from "../picker/RandomPicker";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Landing from "../landing/Landing";
import { withRouter } from "react-router-dom";
import Error from "../error/Error";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const styles = {
  divider: {
    marginBottom: 30
  },
  gamesTitle: {
    marginTop: 30,
    marginLeft: 24
  }
};

function Dashboard(props) {
  const [user, setUser] = useState(null);
  const [gameList, setGameList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchGames();
  }, []);

  async function fetchUser() {
    const res = await fetch("/api/account");
    const json = await res.json();
    setUser(json[0].user);
  }

  async function fetchGames() {
    const res = await fetch("/api/ownedgames");
    const json = await res
      .json()
      .then(responseJson => {
        setGameList(json[0].gamelist);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  }
  const { classes } = props;
  const { state } = props.location;

  if (isLoading) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Grid>
    );
  }

  //Note: the != is purposeful to not be !== due to state sometimes being undefined
  //Find a better way to handle this
  if (user === null || (state != null && state.loggedOut)) {
    return <Landing />;
  }
  if (gameList === null || !gameList.hasOwnProperty("games")) {
    return <Error />;
  }
  return (
    <div>
      <RandomPicker gameList={gameList} />
      <Typography variant="h4" className={classes.gamesTitle}>
        All Owned Games
      </Typography>
      <Divider className={classes.divider} variant="middle" />
      <GameList gameList={gameList} />
    </div>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
