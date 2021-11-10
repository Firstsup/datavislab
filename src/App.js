import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.css'
import {ConfigProvider} from "antd";
import cn from 'antd/es/locale/zh_CN'
import Navigation from "./layout/Navigation";

export default class App extends Component {
    render() {
        return (
            <ConfigProvider locale={cn}>
                <BrowserRouter>
                    <Navigation/>
                </BrowserRouter>
            </ConfigProvider>
        )
    }
}