import React, {Component} from 'react'
import {Button, Form, Input, message, Spin} from 'antd'
import index from "./index.module.css";
import logoWhite from "../../../assets/logo-white.jpg";
import setPassword from "../../../api/User/setPassword";

let isUnmount = false

class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true
        }
    }

    onFinish = (values) => {
        values['username'] = this.props.location.state.username
        try {
            setPassword(values, this.state.controller.signal).then(
                result => {
                    if (result.code !== 0) {
                        message.error(result.message)
                        setTimeout(
                            () => {
                                this.props.history.push('./forgetpassword')
                            }, 1000
                        )
                    } else {
                        message.success('修改成功')
                        setTimeout(
                            () => {
                                this.props.history.push('./login')
                            }, 1000
                        )
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
        console.log(this.props.location.state)
        if (this.props.location.state === undefined) {
            this.props.history.push('/login')
        } else {
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
                            name="setpassword"
                            onFinish={this.onFinish}
                            scrollToFirstError
                        >
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
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        }
    }
}

export default SetPassword
