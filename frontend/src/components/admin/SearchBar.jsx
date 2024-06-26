import React from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search"

export default function SearchBar(props) {

    return (
        <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Search department name or title" onChange={(e) => {
                props.getData(e.target.value);
            }} />
        </div>
    )
}