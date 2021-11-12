import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Discussion from "../../pages/Inner/Discussion";
import Personal from "../../pages/Inner/Personal";
import Recommend from "../../pages/Inner/Recommend";

class InnerNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/personal'} component={Personal}/>
                <Route exact={true} path={'/discussion'} component={Discussion}/>
                <Route exact={true} path={'/recommend'} component={Recommend}/>
            </Switch>
        )
    }
}

export default InnerNavigationRoute