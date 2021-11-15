import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import index from './index.module.css'
import {Card, Descriptions, Divider, Space} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";

const teachers = [
    {
        img: '/图片1.jfif',
        name: '图片1',
        research: '方向1',
        email: '123123123@qq.com',
        introduction: '我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。',
        honor: ['荣誉1', '荣誉2']
    }
]

const students = [
    {
        img: '/图片2.jfif',
        graduate: '2020',
        name: '图片2',
        research: '方向2',
        email: '123123123@qq.com',
        introduction: '我是图片2'
    },
    {
        img: '/图片3.jfif',
        graduate: '2021',
        name: '图片3',
        research: '方向3',
        email: '123123123@qq.com',
        introduction: '我是图片3'
    },
    {
        img: '/图片4.jfif',
        graduate: '2022',
        name: '图片4',
        research: '方向4',
        email: '123123123@qq.com',
        introduction: '我是图片4'
    },
    {
        img: '/图片5.jfif',
        graduate: '2023',
        name: '图片5',
        research: '方向5',
        email: '123123123@qq.com',
        introduction: '我是图片5'
    }
]

class Team extends Component {
    render() {
        return (
            <>
                <div className={index.div}>
                    <Title level={2}>教师</Title>
                    <Divider style={{border: "1px solid #595959", marginTop: '-8px'}}/>
                    {teachers.map((d, i) => {
                        return (
                            <Card hoverable={true} key={i} className={index.card}>
                                <img className={index.cardImg} src={d.img} alt={d.name}/>
                                <div className={index.text}>
                                    <Descriptions column={2}>
                                        <DescriptionsItem label={'姓名'}
                                                          labelStyle={{fontWeight: 'bold'}}>{d.name}</DescriptionsItem>
                                        <DescriptionsItem label={'邮箱'}
                                                          labelStyle={{fontWeight: 'bold'}}>{d.email}</DescriptionsItem>
                                        <DescriptionsItem label={'研究方向'} labelStyle={{fontWeight: 'bold'}}
                                                          span={2}>{d.research}</DescriptionsItem>
                                        <DescriptionsItem label={'个人简介'} labelStyle={{fontWeight: 'bold'}}
                                                          span={2}>{d.introduction}</DescriptionsItem>
                                        <DescriptionsItem label={'荣誉奖励'} labelStyle={{fontWeight: 'bold'}} span={2}>
                                            <Space direction={'vertical'}>
                                                {d.honor.map((dd, ii) => {
                                                    return (
                                                        <span key={ii}>{dd}</span>
                                                    )
                                                })}
                                            </Space>
                                        </DescriptionsItem>
                                    </Descriptions>
                                </div>
                            </Card>
                        )
                    })}
                </div>
                <div className={index.div}>
                    <Title level={2}>学生</Title>
                    <Divider style={{border: "1px solid #595959", marginTop: '-8px'}}/>
                    {students.map((d, i) => {
                        return (
                            <Card hoverable={true} key={i} className={index.card}>
                                <img className={index.cardImg} src={d.img} alt={d.name}/>
                                <div className={index.text}>
                                    <Descriptions column={2}>
                                        <DescriptionsItem label={'姓名'}
                                                          labelStyle={{fontWeight: 'bold'}}>{d.name}</DescriptionsItem>
                                        <DescriptionsItem label={'邮箱'}
                                                          labelStyle={{fontWeight: 'bold'}}>{d.email}</DescriptionsItem>
                                        <DescriptionsItem label={'毕业年份'} labelStyle={{fontWeight: 'bold'}}
                                                          span={2}>{d.graduate}</DescriptionsItem>
                                        <DescriptionsItem label={'研究方向'} labelStyle={{fontWeight: 'bold'}}
                                                          span={2}>{d.research}</DescriptionsItem>
                                        <DescriptionsItem label={'个人简介'} labelStyle={{fontWeight: 'bold'}}
                                                          span={2}>{d.introduction}</DescriptionsItem>
                                    </Descriptions>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Team