import "../css/userDetail.css";
import React from "react";
import { connect } from "react-redux";

class UserDetail extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.UI.convWindow.isSelected ? (
            <div className="user-detail user-detail-show">
                <img src="/static/assets/images/profile.svg" alt=" " />
                <span>{this.props.UI.convWindow.selectedUser}</span>
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
