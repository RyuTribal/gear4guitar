import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import Moment from "react-moment";

function capitalizeFirstLetter(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1);
  } else {
    return "";
  }
}

export default function Comment(props) {
  return (
    <Grid item xs={12} container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Typography variant="subtitle">
            {capitalizeFirstLetter(props.comment.first_name)}
          </Typography>
          <Typography variant="subtitle">
            {capitalizeFirstLetter(props.comment.last_name)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Typography variant="subtitle">
            <Moment fromNow>{props.comment.created_at}</Moment>
          </Typography>
        </Box>
        {props.isAdmin || props.user_id === props.comment.user_id ? (
          <IconButton onClick={() => props.deleteComment(props.comment.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body">{props.comment.comment}</Typography>
      </Grid>
    </Grid>
  );
}
