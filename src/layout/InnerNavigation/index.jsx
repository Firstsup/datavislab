import React, {Component} from 'react';
import index from "./index.module.css";
import {Layout, Menu, Typography} from "antd";
import {Link, withRouter} from "react-router-dom";
import InnerNavigationRoute from "../../routes/InnerNavigation";
import logo from '../../assets/logo.png'

const {Header, Content, Footer} = Layout;
const {Paragraph, Link: AntdLink} = Typography;

class InnerNavigation extends Component {
    clickLogo = () => {
        this.props.history.push('/index')
        this.props.history.go()
    }
    clickBackground = () => {
        this.props.history.push('/background/login')
        this.props.history.go()
    }

    render() {
        return (
            <Layout className={index.layout}>
                <Header className="header">
                    <img className={index.logoImg} src={logo} alt={'logo'} style={{cursor: 'pointer'}}
                         onClick={this.clickLogo}/>
                    <Menu className={index.menu} theme="dark" mode="horizontal"
                          selectedKeys={[this.props.history.location.pathname]}>
                        <Menu.Item key="/discussion"><Link to={'/discussion'}>讨论与总结</Link></Menu.Item>
                        <Menu.Item key="/recommend"><Link to={'/recommend'}>推荐阅读</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 74px', margin: '16px 0'}}>
                    <InnerNavigationRoute/>
                </Content>
                <Footer className={index.footer}>
                    <Paragraph className={index.paragraph} style={{fontWeight: 'bold'}}>
                        大数据可视分析实验室&emsp;Visual Analytic of Big Data Lab
                    </Paragraph>
                    <AntdLink onClick={this.clickBackground}>后台管理</AntdLink>
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(InnerNavigation)
