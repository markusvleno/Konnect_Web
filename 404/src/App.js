import "./style.css";
import React from "react";
import { robotIlustration, gear1, gear2, gear3, gear4 } from "./images/Svgs";

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
                </div>
                <span className="oops"></span>
            </div>
        );
    }
}

export default App;
