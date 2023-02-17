import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.hvSpacing("md", 0),
    },
    code: {},
    title: {
      maxWidth: 460,
      textAlign: "center",
      marginTop: theme.hvSpacing("xs"),

      // make title overlay the image
      overflow: "visible",
      height: theme.hvSpacing("md"),
    },
    image: {
      width: "100%",
      maxWidth: 800,
    },
    footer: {
      marginTop: theme.hvSpacing("lg"),
      textAlign: "center",
    },
  });

export const useStyles = makeStyles(styles, { name: "NotFound" });

export default styles;
