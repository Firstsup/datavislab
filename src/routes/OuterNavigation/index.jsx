import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Index from "../../pages/Outer/Index";
import News from "../../pages/Outer/News";
import Team from "../../pages/Outer/Team";
import NewsDetail from "../../pages/Outer/NewsDetail";
import Achievements from "../../pages/Outer/Achievements";
import Directions from "../../pages/Outer/Directions";
import About from "../../pages/Outer/About";

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
                <Route exact={true} path={'/About'} component={About}/>
                <Redirect to={'/index'}/>
            </Switch>
        )
    }
}

export default OuterNavigationRoute