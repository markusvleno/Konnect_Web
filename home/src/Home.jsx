import "./css/base.css";
import React from "react";

import { Loading } from "./images/Svg";

class Home extends React.Component {
    render() {
        return (
            <div className="base">
                <Loading />
            </div>
        );
    }
}

export default Home;
