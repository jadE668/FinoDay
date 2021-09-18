import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Leave from "@material-ui/icons/ExitToApp";

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  return (
    <div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        href={"/logout"}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Leave className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Выйти из аккаунта</p>
        </Hidden>
      </Button>
    </div>
  );
}
