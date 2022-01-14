import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Discussion from "../../pages/Inner/Discussion";
import Recommend from "../../pages/Inner/Recommend";
import Login from "../../pages/Inner/Login";
import Register from "../../pages/Inner/Register";
import CheckEmail from "../../pages/Inner/CheckEmail";

class InnerNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/discussion'} component={Discussion}/>
                <Route exact={true} path={'/recommend'} component={Recommend}/>
                <Route exact={true} path={'/login'} component={Login}/>
                <Route exact={true} path={'/register'} component={Register}/>
                <Route exact={true} path={'/checkemail'} component={CheckEmail}/>
            </Switch>
        )
    }
}

export default InnerNavigationRoute