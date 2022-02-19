import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import News from "../../pages/Background/News";
import Directions from "../../pages/Background/Directions";
import About from "../../pages/Background/About";
import Discussion from "../../pages/Background/Discussion";
import Recommend from "../../pages/Background/Recommend";
import Carousel from "../../pages/Background/Index/Carousel";
import Introduction from "../../pages/Background/Index/Introduction";
import Paper from "../../pages/Background/Achievements/Paper";
import Prize from "../../pages/Background/Achievements/Prize";
import Patent from "../../pages/Background/Achievements/Patent";
import Teachers from "../../pages/Background/Team/Teachers";
import Students from "../../pages/Background/Team/Students";
import Login from "../../pages/Background/Login";

class BackgroundNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/background/index/carousel'} component={Carousel}/>
                <Route exact={true} path={'/background/index/introduction'} component={Introduction}/>
                <Route exact={true} path={'/background/news'} component={News}/>
                <Route exact={true} path={'/background/directions'} component={Directions}/>
                <Route exact={true} path={'/background/achievements/paper'} component={Paper}/>
                <Route exact={true} path={'/background/achievements/prize'} component={Prize}/>
                <Route exact={true} path={'/background/achievements/patent'} component={Patent}/>
                <Route exact={true} path={'/background/team/teachers'} component={Teachers}/>
                <Route exact={true} path={'/background/team/students'} component={Students}/>
                <Route exact={true} path={'/background/About'} component={About}/>
                <Route exact={true} path={'/background/discussion'} component={Discussion}/>
                <Route exact={true} path={'/background/recommend'} component={Recommend}/>
                <Route exact={true} path={'/background/login'} component={Login}/>
                <Redirect to={'/background/index/carousel'}/>
            </Switch>
        )
    }
}

export default BackgroundNavigationRoute
