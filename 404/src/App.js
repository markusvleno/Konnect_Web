import "./style.css";
import React from "react";
import { logo, robotIlustration, gear1, gear2, gear3, gear4, gearinner1, gearinner2, gearinner4 } from "./images/Svgs";

class App extends React.Component {
    render() {
        return (
            <div className="base">
                <div className="robot-base">
                    {robotIlustration()}
                    <div>{gear1()}</div>
                    <div>{gear2()}</div>
                    <div>{gear3()}</div>
                    <div>{gear4()}</div>
                    <div>{gearinner1()}</div>
                    <div>{gearinner2()}</div>
                    <div>{gearinner4()}</div>
                </div>
                <div className="oops">
                    {logo()}
                    <span>ops!</span>
                </div>
            </div>
        );
    }
}

export default App;
