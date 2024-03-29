import "../css/search.css";
import React from "react";

import { search } from "../images/svgs";

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <div className="search-logo">{search()}</div>
                <input
                    type="text"
                    placeholder="Search"
                    onKeyPress={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        );
    }
}

export default Search;
