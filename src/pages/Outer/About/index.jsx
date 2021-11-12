import React, {Component} from 'react';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import {Descriptions} from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const labInformation = {
    ChineseName: '大数据可视分析实验室',
    EnglishName: 'Visual Analytic of Big Data Lab',
    phone: '123123123',
    email: '123123123@qq.com',
    address: '四川省 成都市 高新西区 西源大道2006号 电子科技大学清水河校区 创新中心B312',
    invitation: '欢迎有志之士前来'
}

class About extends Component {
    render() {
        return (
            <div className={index.div}>
                <Title level={2} className={index.title}>大数据可视分析实验室</Title>
                <Descriptions className={index.descriptions} column={1}>
                    <Descriptions.Item label="联系电话" contentStyle={{fontSize: '20px'}} labelStyle={{
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>{labInformation.phone}</Descriptions.Item>
                    <Descriptions.Item label="联系邮箱" contentStyle={{fontSize: '20px'}} labelStyle={{
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>{labInformation.email}</Descriptions.Item>
                    <Descriptions.Item label="地址" contentStyle={{fontSize: '20px'}} labelStyle={{
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>{labInformation.address}</Descriptions.Item>
                </Descriptions>
                <Paragraph style={{
                    paddingTop: '50px',
                    fontSize: '20px',
                    textIndent: '2em'
                }}>{labInformation.invitation}</Paragraph>
            </div>
        )
    }
}

export default About