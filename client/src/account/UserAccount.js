import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router-dom";

const styles = {
  avatar: {
    margin: 16,
    width: 40,
    height: 40
  }
};

function UserAccount(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    props.history.push({
      pathname: "/",
      state: { loggedOut: true }
    });
    props.onLogout();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes, user } = props;
  return (
    <div>
      <ButtonBase
        component={Avatar}
        src={user.photos[2].value}
        alt="avatar"
        focusRipple
        className={classes.avatar}
        onClick={event => handleClick(event)}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(withStyles(styles)(UserAccount));
