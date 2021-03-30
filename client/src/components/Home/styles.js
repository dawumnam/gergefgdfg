import { makeStyles, useStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
