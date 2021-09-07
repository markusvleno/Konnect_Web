import "./css/base.css";
import "./css/template.css";
import React from "react";
import { useDispatch } from "react-redux";
import { init } from "./redux/slice/user";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";
import { useEffect } from "react";

const App = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const response = fetch("/test").then((res) => res.json());
        dispatch(init(response.user));
    }, [dispatch]);

    return (
        <div className="base">
            <div className="template m-menu-area">
                <div className="btn-back"></div>
                <div className="template-logo">
                    <Logo />
                </div>
                <div className="template-options">
                    <Option />
                </div>
                <div className="template-search">
                    <Search />
                </div>
                <div className="template-users">
                    <Users />
                </div>
                <div className="template-converstion">
                    <Conversation />
                </div>
            </div>
        </div>
    );
};

export default App;
