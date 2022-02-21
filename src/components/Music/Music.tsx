import React, {ComponentType} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class Music extends React.Component {
    render() {
        return (
            <div>
                Music
            </div>
        );
    }
}

export default compose<ComponentType>(connect(), withAuthRedirect)(Music)
