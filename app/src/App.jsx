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

import { v4 as uuid } from "uuid";
import util from "./signal/helpers";
import { createSignalProtocolManager } from './signal/SignalGateway'

let messageSocket = null;

class App extends React.PureComponent {
    async constructor(props) {
        super(props);
        this.keyHelper = window.libsignal.KeyHelper;
        this.init = this.props.init.bind(this);
        console.log(this.keyHelper);
    }

    async componentDidMount() {
        // const response = await fetch("/user").then((res) => res.json());
        const response = {
            user: {
                username: "Markus",
                name: "Makrus",
                profilePicture: "/static/assets/images/profile.svg",
                conversation: [],
            },
        };

        var regID = this.keyHelper.generateRegistrationId();
        // this.keyHelper.generateIdentityKeyPair().then((identityKeyPair) => {
        //     console.log(util.arrayBufferToBase64(identityKeyPair.pubKey));
        //     console.log(util.arrayBufferToBase64(identityKeyPair.privKey));
        // });
        this.keyHelper.generatePreKey(101).then(function (prekey) {
            console.log(util.arrayBufferToBase64(prekey.keyPair.pubKey));
            console.log(util.arrayBufferToBase64(prekey.keyPair.privKey));
        });
        console.log(regID);
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
                        {this.props.UI.convWindow.isSelected ? <Conversation /> : <></>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, { init })(App);
