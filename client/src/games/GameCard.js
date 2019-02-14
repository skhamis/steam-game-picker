import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: 235,
    textAlign: "center"
  },
  media: {
    height: 80
  }
};

function GameCard(props) {
  const { classes, game } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            "http://media.steampowered.com/steamcommunity/public/images/apps/" +
            game.appid +
            "/" +
            game.img_logo_url +
            ".jpg"
          }
        />
        <CardContent>
          <Typography component="h2">{game.name}</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Hours: {numberWithCommas(game.playtime_forever)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

GameCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameCard);
