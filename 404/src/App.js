import "./style.css";
import React from "react";
import {
    _404,
    email,
    gear1,
    gear2,
    gear3,
    gear4,
    gear5,
    gear6,
    gear7,
    gear8,
    particle1,
    particle2,
    particle3,
    robot,
} from "./images/Svgs";

class App extends React.Component {
    render() {
        return (
            <div className="base">
                <div className="robot-base">
                    <div className="robot">{robot()}</div>
                    <div className="_404">{_404()}</div>
                    <div className="gear1">{gear1()}</div>
                </div>
                <span className="oops"></span>
            </div>
        );
    }
}

export default App;
