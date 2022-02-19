import React, {Component} from 'react'
import {Button, Form, Input, message, Spin} from 'antd'
import index from "./index.module.css";
import logoWhite from "../../../assets/logo-white.jpg";
import checkChangePassword from "../../../api/User/checkChangePassword";

let isUnmount = false

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true
        }
    }

    onFinish = (values) => {
        try {
            checkChangePassword(values, this.state.controller.signal).then(
                result => {
                    if (result.code !== 0) {
                        message.error(result.message)
                    } else {
                        this.props.history.push({pathname: 'forgetpasswordcheckemail', state: {values: values}})
                    }
                }
            )
        } catch (e) {
            console.log('e:', e)
        }
    }

    componentDidMount() {
        isUnmount = false
        if (!isUnmount) {
            this.setState({
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
            const formItemLayout = {
                labelCol: {
                    xs: {
                        span: 24,
                    },
                    sm: {
                        span: 10,
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 24,
                    },
                    sm: {
                        span: 5,
                    },
                },
            }
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 10,
                    },
                },
            }
            return (
                <>
                    <img className={index.logoImg} src={logoWhite} alt={'logo'}/>
                    <Form
                        {...formItemLayout}
                        name="forgetpassowrd"
                        onFinish={this.onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式不正确',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                找回
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
        }
    }
}

export default ForgetPassword
