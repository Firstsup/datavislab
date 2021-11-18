import React, {Component} from 'react';
import index from './index.module.css'
import {Layout, Menu, Typography} from "antd";
import {Link, withRouter} from "react-router-dom";
import BackgroundNavigationRoute from "../../routes/BackgroundNavigation";

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;
const {Paragraph, Link: AntdLink} = Typography;

const labInformation = {
    ChineseName: '大数据可视分析实验室',
    EnglishName: 'Visual Analytic of Big Data Lab',
    phone: '123123123',
    email: '123123123@qq.com',
    address: '创新中心B312'
}

class BackgroundNavigation extends Component {
    clickLogo = () => {
        this.props.history.push('/index')
        this.props.history.go()
    }
    clickBackground = () => {
        this.props.history.push('/background')
    }

    render() {
        const {pathname} = this.props.history.location
        return (
            <Layout className={index.layout}>
                <Header className="header">
                    <img className={index.logoImg} src={'/logo.png'} alt={'logo'} style={{cursor: 'pointer'}}
                         onClick={this.clickLogo}/>
                    <Menu className={index.menu} theme="dark" mode="horizontal"
                          selectedKeys={['/background']}>
                        <Menu.Item key="/background">后台管理</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 74px', margin: '16px 0'}}>
                    <Layout className={index.innerLayout}>
                        <Sider theme={'light'} className={index.sider}>
                            <Menu mode="inline" selectedKeys={pathname}
                                  defaultOpenKeys={(pathname === '/background/index/carousel' || pathname === '/background/index/introduction' || pathname === '/background') ? ['index'] : ((pathname === '/background/achievements/paper' || pathname === '/background/achievements/prize' || pathname === '/background/achievements/patent') ? ['achievements'] : ((pathname === '/background/team/teachers' || pathname === '/background/team/students') ? ['team'] : []))}>
                                <SubMenu key="index" title="首页">
                                    <Menu.Item key="/background/index/carousel"><Link
                                        to={'/background/index/carousel'}>走马灯</Link></Menu.Item>
                                    <Menu.Item key="/background/index/introduction"><Link
                                        to={'/background/index/introduction'}>实验室简介</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="/background/news"><Link to={'/background/news'}>新闻</Link></Menu.Item>
                                <Menu.Item key="/background/directions"><Link to={'/background/directions'}>研究方向</Link></Menu.Item>
                                <SubMenu key="achievements" title="团队成果">
                                    <Menu.Item key="/background/achievements/paper"><Link
                                        to={'/background/achievements/paper'}>论文</Link></Menu.Item>
                                    <Menu.Item key="/background/achievements/prize"><Link
                                        to={'/background/achievements/prize'}>奖项</Link></Menu.Item>
                                    <Menu.Item key="/background/achievements/patent"><Link
                                        to={'/background/achievements/patent'}>专利</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="team" title="团队">
                                    <Menu.Item key="/background/team/teachers"><Link
                                        to={'/background/team/teachers'}>教师</Link></Menu.Item>
                                    <Menu.Item key="/background/team/students"><Link
                                        to={'/background/team/students'}>学生</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="/background/about"><Link
                                    to={'/background/about'}>关于我们</Link></Menu.Item>
                                <Menu.Item key="/background/discussion"><Link to={'/background/discussion'}>讨论与总结</Link></Menu.Item>
                                <Menu.Item key="/background/recommend"><Link
                                    to={'/background/recommend'}>推荐阅读</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content className={index.content}>
                            <BackgroundNavigationRoute/>
                        </Content>
                    </Layout>
                </Content>
                <Footer className={index.footer}>
                    <Paragraph className={index.paragraph} style={{fontWeight: 'bold'}}>
                        大数据可视分析实验室&emsp;Visual Analytic of Big Data Lab
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        联系电话：{labInformation.phone}&emsp;联系邮箱：{labInformation.email}
                    </Paragraph>
                    <Paragraph className={index.paragraph}>
                        地址：{labInformation.address}&emsp;<AntdLink onClick={this.clickBackground}>后台管理</AntdLink>
                    </Paragraph>
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(BackgroundNavigation)