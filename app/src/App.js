import "./css/base.css";
import "./css/template.css";
import React from "react";
import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";

class App extends React.Component {
    render() {
        return (
            <div className="base">
                <div className="template m-menu-area">
                    <div className="template-logo">
                        <Logo />
                    </div>
                    <div className="template-options">
                        <Option />
                    </div>
                    <div className="template-search">
                        <Search />
                    </div>
                    <div className="template-users"></div>
                    <div className="template-converstion"></div>
                </div>
            </div>
        );
    }
}

export default App;
