import React, {ComponentType} from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {NavbarContainer} from "./components/Navbar/NavbarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppRootState} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

export type AppPropsType = {
    initializeAppTC: () => void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {

        if (!this.props.initializeAppTC) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/news'} render={() => <News/>} />
                    <Route path={'/musics'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppRootState) => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeAppTC})
)(App)