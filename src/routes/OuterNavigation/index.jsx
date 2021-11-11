import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Index from "../../pages/Index";
import News from "../../pages/News";
import Team from "../../pages/Team";
import NewsDetail from "../../pages/NewsDetail";
import Achievements from "../../pages/Achievements";
import Directions from "../../pages/Directions";
import About from "../../pages/About";

class OuterNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/index'} component={Index}/>
                <Route exact={true} path={'/news'} component={News}/>
                <Route exact={true} path={'/newsdetail/:id'} component={NewsDetail}/>
                <Route exact={true} path={'/directions'} component={Directions}/>
                <Route exact={true} path={'/team'} component={Team}/>
                <Route exact={true} path={'/achievements'} component={Achievements}/>
                <Route exact={true} path={'/about'} component={About}/>
                <Redirect to={'/index'}/>
            </Switch>
        )
    }
}

export default OuterNavigationRoute