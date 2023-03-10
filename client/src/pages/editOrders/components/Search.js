import { Button, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function Search(props) {
  const [query, setQuery] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <TextField
        sx={{ "& fieldset": { borderRadius: "5px 0 0 5px" } }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Order Reference ID"
        variant="outlined"
        type="number"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.search(query);
            setQuery("");
          }
        }}
      />
      <Button
        sx={{ borderRadius: "0 5px 5px 0" }}
        variant="contained"
        onClick={() => {
          setQuery("");
          props.search(query);
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}
