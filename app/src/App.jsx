import "./css/base.css";
import "./css/template.css";
import React from "react";
import { connect } from "react-redux";
import { init } from "./redux/slice/user";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";
import { MessageHandler } from "./socket";

import { v4 as uuid } from "uuid";

let messageSocket = null;

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        if (!messageSocket) messageSocket = new MessageHandler();

        messageSocket.sendMessage(
            {
                ID: uuid(),
                data: "asdawdaD",
                type: "awdadsawd",
                time: null,
            },
            "ajwbdjawd",
            "awdabwnda",
        );

        this.init = this.props.init.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/test").then((res) => res.json());
        this.init(response.user);
    }

    render() {
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
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { init })(App);

// export default App;
