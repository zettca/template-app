import React, { ReactNode } from "react";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import DogeSpace from "./DogeSpace";
import { useStyles } from "./styles";

export interface NotFoundProps {
  code?: ReactNode;
  title: ReactNode;
  footer?: ReactNode;
  label?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  code,
  title = "Page not found",
  label,
  footer,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HvTypography variant="sTitle" className={classes.code}>
        {code || ""}
      </HvTypography>
      <div className={classes.title}>
        <HvTypography variant="xlTitle">{title}</HvTypography>
      </div>
      <div className={classes.image}>
        <DogeSpace title={label} />
      </div>
      {footer ? <div className={classes.footer}>{footer}</div> : null}
    </div>
  );
};

export default NotFound;
