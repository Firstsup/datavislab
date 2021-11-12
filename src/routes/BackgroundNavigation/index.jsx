import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Background from "../../pages/Background";

class BackgroundNavigationRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path={'/background'} component={Background}/>
            </Switch>
        )
    }
}

export default BackgroundNavigationRoute