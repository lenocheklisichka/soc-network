import React, {ComponentType} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const News = () => {
    return (
        <div>
            News
        </div>
    );
}

export default compose<ComponentType>(connect(), withAuthRedirect)(News)