import "../css/search.css";
import React from "react";

import logo_search from "../images/search.svg";

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <img src={logo_search} alt="logo search" className="search-logo" />
                <input type="text" placeholder="Search" />
            </div>
        );
    }
}

export default Search;
