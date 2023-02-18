import { TextField, Grid, Button, Typography, Pagination } from "@mui/material";
import React from "react";
import useWindowSize from "../../../redundant_functions/WindowSize";
import Comment from "./comment";

export default function Comments(props) {
  const { comments, total_comments } = props;
  const [comment, setComment] = React.useState("");
  const size = useWindowSize();
  return (
    <Grid container spacing={2} alignItems="start">
      <Grid item xs={12}>
        <Typography variant="h5">
          Comments: {total_comments ? total_comments : 0}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: size.width > 851 ? "row" : "column",
          gap: "10px",
        }}
      >
        <TextField
          label="Write what you think about this product..."
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setComment("");
              props.addComment(comment);
            }
          }}
        />
        <Button
          onClick={() => {
            setComment("");
            props.addComment(comment);
          }}
          variant="contained"
        >
          Comment
        </Button>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              isAdmin={props.isAdmin}
              user_id={props.user_id}
              comment={comment}
              deleteComment={(id) => props.deleteComment(id)}
            />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6">{`No comments :(`}</Typography>
          </Grid>
        )}
      </Grid>
      {total_comments > 20 && (
        <Grid item xs={12}>
          <Pagination
            variant="outlined"
            color="primary"
            page={props.page}
            count={Math.ceil(total_comments / 10)}
            onChange={(e, page) => props.changePage(page)}
          />
        </Grid>
      )}
    </Grid>
  );
}
