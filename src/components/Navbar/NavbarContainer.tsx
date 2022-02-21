import {InitialStateSidebarType} from "../../redux/sidebar-reducers";
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {AppRootState} from "../../redux/redux-store";

type mapStateToPropsType = {
    sidebar: InitialStateSidebarType
}

const mapStateToProps = (state: AppRootState): mapStateToPropsType => {
    return {
        sidebar: state.sidebar
    }
}

export const NavbarContainer = connect(mapStateToProps)(Navbar);