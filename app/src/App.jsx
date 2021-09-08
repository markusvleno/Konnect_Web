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
import MessageHandler from "./socket";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        new MessageHandler();
        // this.socket = new io("http://localhost:5000", { path: "/chat", forceNew: false });

        // this.socket.emit("hello");
        // this.socket.on("hi", () => {
        //     console.log("rec");
        // });
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

const mapDispatchToProps = {
    init,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
