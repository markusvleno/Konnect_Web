import "../css/conversation.css";
import React from "react";
import { connect } from "react-redux";

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.getconversation =  this.getconversation.bind(this);
    }

    componentDidUpdate() {  
        console.log(this.props.user.coversation);
    }

    getconversation() {
        let conv = new Array(0);
        conv = this.props.user.conversation;
        let user = this.props.UI.convWindow.username;

        conv.forEach((user) => {
            console.log(user);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="conversation">{}</div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStatetoProps, null)(Conversation);
