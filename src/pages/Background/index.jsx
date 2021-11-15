import React, {Component} from 'react';
import index from './index.module.css'
import {Menu, Layout, Button, Upload, message, Input, Form} from "antd";
import Title from "antd/es/typography/Title";
import {UploadOutlined} from '@ant-design/icons';

const {Content, Sider} = Layout;
const {TextArea} = Input;
const {SubMenu} = Menu;

const photos = [
    {
        img: '/图片1.jfif',
        alt: '图片1'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2'
    },
    {
        img: '/图片3.jfif',
        alt: '图片3'
    }
]
const introduction = '电子科技大学大数据可视分析实验室。读书有感：从前读书，一目十行，读完作罢，书云亦云，如需记忆，死记硬背便可。现在读书，知作者资料，了解作品创作背景，一字一词一句，仔细斟酌品味，多有自己所感所思所悟，作品主旨与自身所悟合一终为所学所获。妙哉，妙哉！发怒，是用别人的错误惩罚自己；烦恼，是用自己的过失折磨自己；后悔，是用无奈的往事摧残自己；忧虑，是用虚拟的风险惊吓自己；孤独，是用自制的牢房禁锢自己；自卑，是用别人的长处抵毁自己。摒弃这些，你就会轻松许多！'
const indexProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 'index-carousel',
            indexIntroduction: introduction
        }
    }

    clickMenu = (target) => {
        this.setState({
            selectedKey: target.key
        })
    }

    indexChangeImg = (i) => {
        return (() => {
            console.log(i)
        })
    }

    indexFinishForm = (value) => {
        console.log(value)
        console.log(value.introduction)
        const arr = value.introduction.split('\n')
        console.log(arr)
    }

    render() {
        const {selectedKey} = this.state
        return (
            <Layout className={index.layout}>
                <Sider theme={'light'} className={index.sider}>
                    <Menu mode="inline" selectedKeys={this.state.selectedKey} defaultOpenKeys={['index']}
                          onClick={this.clickMenu}>
                        <SubMenu key="index" title="首页">
                            <Menu.Item key="index-carousel">走马灯</Menu.Item>
                            <Menu.Item key="index-introduction">实验室简介</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="news">新闻</Menu.Item>
                        <Menu.Item key="directions">研究方向</Menu.Item>
                        <SubMenu key="achievements" title="团队成果">
                            <Menu.Item key="achievements-paper">论文</Menu.Item>
                            <Menu.Item key="achievements-prize">奖项</Menu.Item>
                            <Menu.Item key="achievements-patent">专利</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="team">团队成员</Menu.Item>
                        <Menu.Item key="about">关于我们</Menu.Item>
                        <Menu.Item key="discussion">讨论与总结</Menu.Item>
                        <Menu.Item key="recommend">推荐阅读</Menu.Item>
                    </Menu>
                </Sider>
                <Content className={index.content}>
                    {selectedKey === 'index-carousel' ?
                        <div>
                            <Title level={3}>走马灯</Title>
                            {photos.map((d, i) => {
                                return (
                                    <div key={i} className={index.indexImgDiv}>
                                        <img src={d.img} alt={d.alt} className={index.indexCarouselImg}/>
                                        <Upload {...indexProps}>
                                            <Button icon={<UploadOutlined/>} onClick={this.indexChangeImg(i)}
                                                    style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                        </Upload>
                                    </div>
                                )
                            })}
                        </div> : (selectedKey === 'index-introduction' ?
                            <div>
                                <Title level={3}>实验室简介</Title>
                                <Form style={{marginTop:'20px'}} initialValues={{introduction:introduction}} onFinish={this.indexFinishForm}>
                                    <Form.Item name={'introduction'}>
                                        <Input.TextArea autoSize={true} showCount/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div> :
                            <div>
                                推荐阅读
                            </div>)
                    }
                </Content>
            </Layout>
        )
    }
}

export default Background