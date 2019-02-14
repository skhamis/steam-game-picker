import React, { useState, useEffect } from "react";
import GameList from "../games/GameList";
import RandomPicker from "../picker/RandomPicker";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Landing from "../landing/Landing";

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
    const json = await res.json();
    setGameList(json[0].gamelist);
  }
  const { classes } = props;

  if (user === null) {
    return <Landing />;
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

export default withStyles(styles)(Dashboard);
