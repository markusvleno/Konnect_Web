import "./css/base.css";
import "./css/template.css";
import React from "react";
import { connect } from "react-redux";
import { newMessage, init } from "./redux/slice/user";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway";
import { getConversation, putConversation } from "./utils";
import { io } from "socket.io-client";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";

// import { v4 as uuid } from "uuid";

// let messageSocket = null;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.init = this.props.init.bind(this);
        this.state = {
            SignalServer: new SignalServerStore(),
        };
    }

    async componentDidMount() {
        const response = await fetch("api/v1/user").then((res) => res.json());

        // socket

        let socket = new io("http://localhost:5000/chat", {
            path: "/sockets",
            autoConnect: true,
            reconnectionDelay: 1000,
            withCredentials: true,
            forceNew: false,
            reconnectionAttempts: 3,
            extraHeaders: {
                "Access-Control-Allow-Origin": "http://localhost",
            },
            query: {
                userId: response.data.userId,
            },
        });

        let temp = [
            {
                username: "brah1",
                userId: "123124414",
                name: "Brah",
                chatLog: [
                    {
                        data: "sup",
                        msgID: 1000,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "omeha ahjsodwodm awodnaowd awopa awpoda awdawdj",
                        msgID: 1001,
                        origin: false,
                        time: Date.now(),
                    },
                    {
                        data: "sup sadawd asdawd asdawdadsawdadsa wdasdawsdasdawdasdawdasd asdawdasdawdasda sdadwasdadwasdad",
                        msgID: 1002,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup homieasdawasdawdasdawdasdawdsdawsdawsdawd",
                        msgID: 1003,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup homieasdawasdawdasdawdasdawdsdawsdawsdawd",
                        msgID: 1004,
                        origin: false,
                        time: Date.now(),
                    },
                    {
                        data: "sup homieasdawasdawdasdawdasdawdsdawsdawsdawd",
                        msgID: 1005,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup homieasdawasdawdasdawdasdawdsdawsdawsdawdGowrsh",
                        msgID: 1006,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup",
                        msgID: 1007,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup",
                        msgID: 1008,
                        origin: true,
                        time: Date.now(),
                    },
                    {
                        data: "sup",
                        msgID: 1009,
                        origin: true,
                        time: Date.now(),
                    },
                ],
            },
            {
                username: "brah2",
                userId: "123124412",
                name: "Brah",
                chatLog: [
                    {
                        data: "sup homie",
                        msgID: 1000,
                        origin: true,
                        time: Date.now(),
                    },
                ],
            },
            {
                username: "brah3",
                userId: "123124415",
                name: "Brah",
                chatLog: [
                    {
                        data: "sup homie",
                        msgID: 1000,
                        origin: true,
                        time: Date.now(),
                    },
                ],
            },
        ];
        putConversation(response.data.userId, temp);
        const savedConv = getConversation(response.data.userId);
        createSignalProtocolManager(response.data.userId, this.state.SignalServer).then((signalProtocalManager) => {
            let userState = {
                ...response.data,
                signalProtocalManager,
                savedConv,
                socket: socket,
            };

            this.init(userState);
        });
    }

    async componentDidUpdate() {
        try {
            // let encryptedMessage = await this.signalProtocalManager.encryptMessageAsync(to.userId, message);
            let encryptedMessage = "brah";
            const { username, userId } = this.props.user;

            let to = {
                username: "lol",
                userId: "lol",
            };

            let _msgToSend = {
                data: encryptedMessage,
                type: "msg/text",
                time: Date.now(),
                reciever: {
                    username: to.username,
                    userId: to.userId,
                },
                sender: {
                    username: username,
                    userId: userId,
                },
            };

            this.props.user.socket.emit(
                "send-message",
                {
                    _msgToSend,
                },
                (response) => {
                    if (!response) return; //message didnt not send

                    console.log(response);

                    // let msgObj = {
                    //     data: _msgToSend.data,
                    //     type: _msgToSend.type,
                    //     time: _msgToSend.time,
                    //     origin: true,
                    // };

                    // this.dispatch(newMessage({ username: _msgToSend.reciever.username, msgObj: msgObj }));
                },
            );
        } catch (error) {
            // console.log("couldn't send message to" + to.username);
        }
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
                        <Users convObjRef={this.convObjRef} />
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

// s:9ucmGEXOcUUINEQh4n3NN3z9qICtmfjs.aOxcRwCW/AaKb//ue+uK+XprDJ+na8qs6+QxD69wYrc
// s%3Aq-JIvrDmtZ7IjqQMbpiA3DZoSJooutFY.XcG5QsrN6RZ2dQluxyIbfJZgHT2WmOhYUJYah2uhdOY
