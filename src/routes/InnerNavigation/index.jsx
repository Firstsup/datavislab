import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Discussion from "../../pages/Inner/Discussion";
import Recommend from "../../pages/Inner/Recommend";
import Login from "../../pages/Inner/Login";
import Register from "../../pages/Inner/Register";
import CheckEmail from "../../pages/Inner/CheckEmail";
import ForgetPassword from "../../pages/Inner/ForgetPassword";
import ForgetPasswordChangePassword from "../../pages/Inner/ForgetPasswordCheckEmail";
import SetPassword from "../../pages/Inner/SetPassword";

class InnerNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/discussion'} component={Discussion}/>
                <Route exact={true} path={'/recommend'} component={Recommend}/>
                <Route exact={true} path={'/login'} component={Login}/>
                <Route exact={true} path={'/register'} component={Register}/>
                <Route exact={true} path={'/checkemail'} component={CheckEmail}/>
                <Route exact={true} path={'/forgetpassword'} component={ForgetPassword}/>
                <Route exact={true} path={'/forgetpasswordcheckemail'} component={ForgetPasswordChangePassword}/>
                <Route exact={true} path={'/setpassword'} component={SetPassword}/>
            </Switch>
        )
    }
}

export default InnerNavigationRoute
