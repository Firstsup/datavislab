import React, {Component} from 'react';
import index from './index.module.css'
import {Layout, Menu, Typography} from "antd";
import {Link} from "react-router-dom";
import BackgroundNavigationRoute from "../../routes/BackgroundNavigation";

const {Header, Content, Footer} = Layout;
const {Paragraph} = Typography;

const labInformation = {
    ChineseName: '大数据可视分析实验室',
    EnglishName: 'Visual Analytic of Big Data Lab',
    phone: '123123123',
    email: '123123123@qq.com',
    address: '创新中心B312'
}

class BackgroundNavigation extends Component {
    render() {
        return (
            <Layout className={index.layout}>
                <Header className="header">
                    <img className={index.logoImg} src={'/logo.png'} alt={'logo'} style={{cursor: 'pointer'}}
                         onClick={this.clickLogo}/>
                    <Menu className={index.menu} theme="dark" mode="horizontal"
                          selectedKeys={['/background']}>
                        <Menu.Item key="/background"><Link to={'/background'}>后台管理</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 74px', margin: '16px 0'}}>
                    <BackgroundNavigationRoute/>
                </Content>
                <Footer className={index.footer}>
                    <Paragraph className={index.paragraph} style={{fontWeight: 'bold'}}>
                        大数据可视分析实验室&emsp;Visual Analytic of Big Data Lab
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        联系电话：{labInformation.phone}&emsp;联系邮箱：{labInformation.email}
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        地址：{labInformation.address}
                    </Paragraph>
                </Footer>
            </Layout>
        )
    }
}

export default BackgroundNavigation