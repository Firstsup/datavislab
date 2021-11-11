import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Index from "../../pages/Index";
import News from "../../pages/News";
import Team from "../../pages/Team";
import NewsDetail from "../../pages/NewsDetail";
import Achievements from "../../pages/Achievements";
import Directions from "../../pages/Directions";
import About from "../../pages/About";

class NavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/index'} component={Index}/>
                <Route path={'/news'} component={News}/>
                <Route path={'/newsdetail/:id'} component={NewsDetail}/>
                <Route path={'/directions'} component={Directions}/>
                <Route path={'/team'} component={Team}/>
                <Route path={'/achievements'} component={Achievements}/>
                <Route path={'/about'} component={About}/>
                <Redirect to={'/index'}/>
            </Switch>
        )
    }
}

export default NavigationRoute