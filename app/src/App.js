import React from "react";
import "./css/base.css";
import "./css/template.css";

class App extends React.Component {
    render() {
        return (
            <div className="base">
                <div className="template m-menu-area">
                    <div className="logo"></div>
                    <div className="options"></div>
                    <div className="search"></div>
                    <div className="users"></div>
                    <div className="converstion"></div>
                </div>
            </div>
        );
    }
}

export default App;
