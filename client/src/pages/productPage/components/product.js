import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { List, ListItem } from "@mui/material";
import SkeletonText from "./skeleton";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  padding: 10,
  borderRadius: 4,
  border: "1px solid #989898",
}));

function convertJSON_toIslam(json) {
  // Inshallah1   Inshallah2   Inshallah3
  return json;
}

function render(results, buttonFunction, submit, comment, setValue, reset) {
  if (!results || results.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "10px 30px",
        }}
      >
        <SkeletonText />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          width: "70%",
        }}
      >
        {results.map((result) => (
          <Box
            flexBasis={0}
            flexShrink={1}
            flexGrow={1}
            sx={{ display: "flex", flexDirection: "row", padding: "20px 20px" }}
          >
            <Box
              flexBasis={0}
              flexShrink={1}
              flexGrow={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 20px",
              }}
            >
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px",
                }}
              >
                <Typography variant="h4" sx={{ color: "#434649" }}>
                  {result.title}
                </Typography>
              </Box>
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px",
                }}
              >
                <Box
                  component="img"
                  src={result.images[0]}
                  alt="image"
                  width={600}
                  height={600}
                />
              </Box>
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Description
                </Typography>

                <Typography>
                  {convertJSON_toIslam(result.description)}
                </Typography>
                <br />
              </Box>
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Specifications
                </Typography>
                <List sx={{ listStyleType: "disc", pl: 6 }}>
                  {result.specs.map((spec) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {spec["content"].map((item) => (
                        <ListItem
                          sx={{ display: "list-item", paddingLeft: "0px" }}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </Box>
                  ))}
                </List>
              </Box>
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box
                  flexBasis={0}
                  flexShrink={1}
                  flexGrow={1}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <StyledInputBase
                    onChange={(value) => setValue(value.target.value)}
                    placeholder="Comment"
                    inputProps={{ "aria-label": "comment" }}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        submit(result.id, comment);
                      }
                    }}
                  />
                  <Button onClick={() => submit(result.id, comment)}>
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              flexBasis={0}
              flexShrink={1}
              flexGrow={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 20px",
              }}
            >
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#d00000",
                  }}
                >
                  {result.price} kr
                </Typography>
                <Button
                  onClick={() => buttonFunction(result.id)}
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#FA9600" },
                    backgroundColor: "#FA8600",
                    color: "white",
                  }}
                >
                  Add To Basket
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}

function renderComment(comments, anchorEl, setAnchorEl, open, handleClick, handleClose, chooseOption) {
  if (!comments || comments.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          width: "70%",
        }}
      >
        <Box
          flexBasis={0}
          flexShrink={1}
          flexGrow={1}
          sx={{ display: "flex", flexDirection: "row", padding: "20px 20px" }}
        >
          <Box
            flexBasis={0}
            flexShrink={1}
            flexGrow={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 0px 0px 20px",
            }}
          >
            <Box
              flexBasis={0}
              flexShrink={1}
              flexGrow={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 0px 0px 0px",
              }}
            >
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography variant="h5" sx={{ color: "#434649" }}>
                  No comments
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          width: "70%",
        }}
      >
        {comments.map((comment) => (
          <Box
            flexBasis={0}
            flexShrink={1}
            flexGrow={1}
            sx={{ display: "flex", flexDirection: "row", padding: "20px 20px" }}
          >
            <Box
              flexBasis={0}
              flexShrink={1}
              flexGrow={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 0px 0px 20px",
              }}
            >
              <Box
                flexBasis={0}
                flexShrink={1}
                flexGrow={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 0px 0px 0px",
                }}
              >
                <Box
                  flexBasis={0}
                  flexShrink={1}
                  flexGrow={1}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography>
                    {comment.first_name} {comment.last_name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography>{comment.comment}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        {options.map((option) => (
                          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => chooseOption(option)}>
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}

export default function Results(props) {
  const [comment, setValue] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };
  const chooseOption = (option) => {
    console.log(option)
  }
  const handleClose = () => {
    console.log('option')
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {render(
            props.results.data,
            props.buttonFunction,
            props.submit,
            comment,
            setValue
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {renderComment(props.comments.data, anchorEl, setAnchorEl, open, handleClick, handleClose, chooseOption)}
        </Box>
      </Box>
    </Box>
  );
}
