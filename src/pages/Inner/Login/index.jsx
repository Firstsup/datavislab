import React, {Component} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import index from "./index.module.css"
import {Button, Checkbox, Form, Input, message, Spin, Typography} from "antd";
import logoWhite from '../../../assets/logo-white.jpg'
import login from "../../../api/User/login";
import cookie from 'react-cookies'

const {Link} = Typography

let isUnmount = false

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true
        }
    }

    onFinish = (values) => {
        login({
            username: values.username,
            password: values.password
        }, this.state.controller.signal).then(
            result => {
                if (result.code === 0) {
                    if (values.remember === true) {
                        cookie.save('userInfo', values.username, {expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 14)})
                    }
                    setTimeout(
                        () => {
                            this.props.history.push('./discussion')
                        }, 1000
                    )
                } else if (result.code === 2) {
                    message.error('用户名不存在')
                } else if (result.code === 3) {
                    message.error('密码错误')
                } else {
                    console.log(result.message)
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
        if (cookie.load('userInfo') !== undefined) {
            this.props.history.push('/discussion')
        }
        if (this.state.loading === true) {
            return (
                <div className={index.spin}>
                    <Spin size={"large"}/>
                </div>
            )
        } else {
            return (
                <>
                    <img className={index.logoImg} src={logoWhite} alt={'logo'}/>
                    <Form
                        name="normal_login"
                        className={index.form}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined style={{opacity: '0.5'}}/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined style={{opacity: '0.5'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <Link style={{float: 'right'}} href="/forgetpassword">忘记密码</Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                登录
                            </Button>
                            Or <Link href="/register">现在注册</Link>
                        </Form.Item>
                    </Form>
                </>
            )
        }
    }
}

export default Login
