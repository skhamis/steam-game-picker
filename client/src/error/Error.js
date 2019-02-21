import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

function Error() {
  return (
    <Grid
      style={{ padding: 20, textAlign: "center" }}
      container
      justify="center"
      direction="column"
      alignItems="center"
      spacing={24}
    >
      <Grid item>
        <Paper elevation={1} style={{ padding: 20, backgroundColor: "red" }}>
          <Typography variant="h5" component="h3">
            Uh-oh!
          </Typography>
          <Typography component="p">
            Looks like your profile (or Game Details) is not set to public!
            Click the link below to see how to do that
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401"
          target="_blank"
          rel="noopener"
        >
          Steam article on setting profile to public Link
        </Button>
      </Grid>
      <Grid item>
        <Typography style={{ color: "yellow" }} component="p">
          *Note: If your profile and Game details are public. You might just
          have no games!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Error;
