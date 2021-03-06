import React, {Component, ComponentType} from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
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
import {NotFound404} from "./components/404/NotFound404";

export type AppPropsType = {
    initializeAppTC: () => void
    initialized: boolean
}

class App extends Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/news'} render={() => <News/>}/>
                        <Route path={'/musics'} render={() => <Music/>}/>
                        <Route path={'/settings'} render={() => <Settings/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path='*' render={() => <NotFound404/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppRootState) => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeAppTC}))(App)