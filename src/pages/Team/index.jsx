import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import index from './index.module.css'
import {Card, Descriptions, Divider, Space} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";

const teachers = [
    {
        img: '甘雨立绘.png',
        name: '甘雨',
        research: '冰',
        email: '123123123@qq.com',
        introduction: '璃月七星的使者，月海亭的秘书。实际上是魔神战争时代的仙人，体内流淌着人类与仙兽的血脉。天性优雅娴静，但仙兽「麒麟」温柔的性情与坚定毅重的工作态度毫无冲突。毕竟，甘雨坚信自己所做的一切工作都是为了践行与帝君的契约，谋求璃月众生的最大福祉。',
        honor: ['璃月3C', '璃月椰🐏']
    }
]

const students = [
    {
        img: '可莉立绘.png',
        graduate: '2020',
        name: '可莉',
        research: '火',
        email: '123123123@qq.com',
        introduction: '我是可莉'
    },
    {
        img: '安柏立绘.jpeg',
        graduate: '2021',
        name: '安柏',
        research: '火',
        email: '123123123@qq.com',
        introduction: '我是安柏'
    },
    {
        img: '雷电将军立绘.png',
        graduate: '2022',
        name: '雷电将军',
        research: '雷',
        email: '123123123@qq.com',
        introduction: '我是雷电将军'
    },
    {
        img: '莫娜立绘.png',
        graduate: '2023',
        name: '莫娜',
        research: '水',
        email: '123123123@qq.com',
        introduction: '我是莫娜'
    }
]

class Team extends Component {
    render() {
        return (
            <>
                <div className={index.div}>
                    <Title level={2}>教师</Title>
                    <Divider style={{border: "solid", marginTop: '-8px'}}/>
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
                    <Divider style={{border: "solid", marginTop: '-8px'}}/>
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