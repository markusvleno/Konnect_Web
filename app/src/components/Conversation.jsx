import "../css/conversation.css";
import React from "react";
// import { connect } from "react-redux";
import { useSelector } from "react-redux";

// class Conversation extends React.Component {
//     constructor(props) {
//         super(props);

//         this.userObj = this.props.user.conversation.map((user) => {
//             if (user.userId === this.props.UI.convWindow.selectedUserId) return user;
//         })[0];
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div className="conversation">{}</div>
//             </React.Fragment>
//         );
//     }
// }

// const mapStatetoProps = (state) => ({
//     user: state.user,
//     UI: state.UI,
// });

// export default connect(mapStatetoProps, null)(Conversation);

function Conversation() {
    let convUserObj = useSelector((state) => {
        let temp = {};
        state.user.conversation.forEach((user) => {
            if (user.userId === state.UI.convWindow.selectedUserId) temp = user;
        });
        return temp;
    });

    return (
        <React.Fragment>
            <div className="conversation"></div>
        </React.Fragment>
    );
}

export default Conversation;
