import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Discussion from "../../pages/Discussion";

class InnerNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/discussion'} component={Discussion}/>
            </Switch>
        )
    }
}

export default InnerNavigationRoute