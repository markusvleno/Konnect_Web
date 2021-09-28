import "../css/userDetail.css";
import React from "react";
import { connect } from "react-redux";

class UserDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getUsername = this.getUsername.bind(this);
    }

    getUsername() {
        let username = "";
        this.props.user.conversation.forEach((user) => {
            if (user.userId === this.props.UI.convWindow.selectedUserId) username = user.username;
        });
        return username;
    }

    render() {
        return this.props.UI.convWindow.isSelected ? (
            <div className="user-detail user-detail-show">
                <img src="/static/assets/images/profile.svg" alt=" " />
                <span>{this.getUsername()}</span>
            </div>
        ) : (
            <div className="user-detail user-detail-hidden"></div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, {})(UserDetail);
