import React, {Component} from 'react';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import {Button, Form, Input, message, Spin} from "antd";
import getAbout from "../../../api/About/getAbout";
import setAbout from "../../../api/About/setAbout";
import confirm from "antd/es/modal/confirm";
import {ExclamationCircleOutlined} from "@ant-design/icons";

let isUnmount = false

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            labInformation: {}
        }
    }

    indexFinishForm = (value) => {
        try {
            setAbout(value, this.state.controller.signal, 1).then(
                async result => {
                    if (result.code === 0) {
                        message.success('修改成功')
                    } else {
                        message.error(`修改失败，错误为${result.message}`)
                        console.log(result.message)
                    }
                }
            )
        } catch (e) {
            console.log('e:', e)
        }
    }

    showConfirm = (value) => {
        const that = this
        confirm({
            title: '确认修改吗',
            icon: <ExclamationCircleOutlined/>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                that.indexFinishForm(value)
            },
            onCancel() {},
        });
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getAbout(this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                labInformation: result.data
                            })
                        }
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
                <div>
                    <Title level={3}>关于我们</Title>
                    <Form style={{marginTop: '20px'}} initialValues={{
                        phone: labInformation.phone,
                        email: labInformation.email,
                        address: labInformation.address,
                        invitation: labInformation.invitation
                    }}
                          onFinish={this.showConfirm}>
                        <Form.Item label={'联系电话'} name={'phone'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'联系邮箱'} name={'email'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'地址'} name={'address'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'致辞'} name={'invitation'}>
                            <Input.TextArea autoSize={true}/>
                        </Form.Item>
                        <Form.Item>
                            <Button className={index.button} type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        }
    }
}

export default About