import React, {Component} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import './App.css'
import {ConfigProvider} from "antd";
import cn from 'antd/es/locale/zh_CN'
import OuterNavigation from "./layout/OuterNavigation";
import InnerNavigation from "./layout/InnerNavigation";
import BackgroundNavigation from "./layout/BackgroundNavigation";

export default class App extends Component {
    render() {
        return (
            <ConfigProvider locale={cn}>
                <BrowserRouter>
                    <Switch>
                        {window.location.pathname.startsWith('/background') ?
                            <BackgroundNavigation/> : (window.location.pathname === '/discussion' || window.location.pathname === '/recommend') ?
                                <InnerNavigation/> : <OuterNavigation/>}
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        )
    }
}