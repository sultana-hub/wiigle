import React,{useState} from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
const Search = ({setSearchQuery}) => {
    

  return (
    <div >
    <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a product "
      variant="outlined"
      placeholder="Search..."
      size="small"
      style={{width:"700px"}}
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
  </div>
  )
}

export default Search