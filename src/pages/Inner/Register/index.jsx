import React, {Component} from 'react'
import {Button, Form, Input, message, Spin} from 'antd'
import index from "../Login/index.module.css";
import logoWhite from "../../../assets/logo-white.jpg";
import checkRegister from "../../../api/User/checkRegister";

let isUnmount = false

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true
        }
    }

    onFinish = (values) => {
        checkRegister(values, this.state.controller.signal).then(
            result => {
                if (result.code === 2) {
                    message.error('用户名已存在')
                } else if (result.code === 3) {
                    message.error('姓名已存在')
                } else if (result.code === 4) {
                    message.error('邮箱已被使用')
                } else {
                    this.props.history.push({pathname: '/checkemail', state: {values: values}})
                }
            }
        )
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
                        span: 4,
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
                        name="register"
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
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                }, {
                                    pattern: '^(?![\\d]+$)(?![a-zA-Z]+$)(?![^\\da-zA-Z]+$).{6,16}$',
                                    message: '密码必须包括字母、数字、特殊字符中的至少两种，且为6-16位'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请重新输入密码',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不匹配'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的姓名',
                                }, {
                                    pattern: '^[\u4e00-\u9fa5]{2,4}$',
                                    message: '姓名格式不符合要求'
                                }
                            ]}
                            hasFeedback
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
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
        }
    }
}

export default Register