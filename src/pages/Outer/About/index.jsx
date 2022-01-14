import React, {Component} from 'react';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import {Descriptions, Spin} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import getAbout from "../../../api/About/getAbout";

let isUnmount = false

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labInformation: {},
            controller: new AbortController(),
            loading: true
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getAbout(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        this.setState({
                            labInformation: result.data
                        })
                    } else {
                        console.log(result.message)
                    }
                }
            )
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
            const {labInformation} = this.state
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
}

export default About