import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu, Typography} from 'antd';
import index from './index.module.css'
import NavigationRoute from "../../routes/Navigation";

const {Header, Content, Footer} = Layout;
const {Paragraph} = Typography;

const labInformation = {
    ChineseName: '大数据可视分析实验室',
    EnglishName: 'Visual Analytic of Big Data Lab',
    phone: '123123123',
    mail: '123123123@qq.com',
    address: '创新中心B312'
}

class Navigation extends Component {
    clickLogo = () => {
        this.props.history.push('/index')
    }

    render() {
        return (
            <Layout className={index.layout}>
                <Header className="header">
                    <img className={index.logoImg} src={'/logo.png'} alt={'logo'} style={{cursor: 'pointer'}}
                         onClick={this.clickLogo}/>
                    <Menu className={index.menu} theme="dark" mode="horizontal"
                          selectedKeys={[this.props.history.location.pathname.startsWith('/newsdetail') ? '/news' : this.props.history.location.pathname]}>
                        <Menu.Item key="/index"><Link to={'/index'}>首页</Link></Menu.Item>
                        <Menu.Item key="/news"><Link to={'/news'}>新闻资讯</Link></Menu.Item>
                        <Menu.Item key="/achievements"><Link to={'/achievements'}>团队成果</Link></Menu.Item>
                        <Menu.Item key="/team"><Link to={'/team'}>团队成员</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 74px', margin: '16px 0'}}>
                    <NavigationRoute/>
                </Content>
                <Footer className={index.footer}>
                    <Paragraph className={index.paragraph} style={{fontWeight: 'bold'}}>
                        大数据可视分析实验室&emsp;Visual Analytic of Big Data Lab
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        联系电话：{labInformation.phone}&emsp;联系邮箱：{labInformation.mail}
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        地址：{labInformation.address}
                    </Paragraph>
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(Navigation)