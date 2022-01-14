import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import index from './index.module.css'
import {Card, Descriptions, Divider, Space, Spin} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import getTeacher from "../../../api/Team/getTeacher";
import getStudent from "../../../api/Team/getStudent";
import getImageUrl from "../../../api/Qiniu/getImageUrl";

let isUnmount = false

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            teachers: [],
            students: []
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getTeacher(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                teachers: result.data.teachers
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            await getStudent(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                students: result.data.students
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.teachers.length; i++) {
                await getImageUrl(this.state.teachers[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.teachers]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            if (!isUnmount) {
                                this.setState({
                                    teachers: temp
                                })
                            }
                        } else {
                            console.log(result.message)
                        }
                    }
                )
            }

            for (let i = 0; i < this.state.students.length; i++) {
                await getImageUrl(this.state.students[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.students]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            if (!isUnmount) {
                                this.setState({
                                    students: temp
                                })
                            }
                        } else {
                            console.log(result.message)
                        }
                    }
                )
            }
        } catch (e) {
            console.log('e:', e)
        }

        if (!isUnmount) {
            await this.setState({
                loading: false
            })
        }
    }

    componentWillUnmount() {
        this.state.controller.abort()
        isUnmount = true
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div className={index.spin}>
                    <Spin size={"large"}/>
                </div>
            )
        } else {
            const {teachers, students} = this.state
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
}

export default Team