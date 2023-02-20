import { SwipeableDrawer } from "@mui/material";
import React from "react";

export default function MobileDrawer(props) {
  return (
    <SwipeableDrawer
      anchor={props.side}
      open={props.open}
      onClose={() => props.onClose()}
      onOpen={() => props.onOpen()}
      {...props}
    >
      {props.children}
    </SwipeableDrawer>
  );
}
