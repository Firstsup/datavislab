import React, {Component} from 'react'
import index from "../CheckEmail/index.module.css";
import logoWhite from "../../../assets/logo-white.jpg";
import {Input, Button, Spin, message} from 'antd'
import sendCode from "../../../api/User/sendCode";

let isUnmount = false

class ChangePasswordChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            code: ''
        }
        this.myRef = React.createRef()
    }

    handleOk = () => {
        if (this.myRef.current.state.value === this.state.code) {
            this.props.history.push({
                pathname: 'setpassword',
                state: {username: this.props.location.state.values.username}
            })
        } else {
            setTimeout(
                () => {
                    message.error('验证码不正确')
                }, 500
            )
        }
    }

    reSend = () => {
        try {
            sendCode(this.props.location.state.values, this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        this.setState({
                            code: result.data.code
                        })
                    } else {
                        console.log(result.message)
                    }
                }
            )
        } catch (e) {
            console.log('e:', e)
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await sendCode(this.props.location.state.values, this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        this.setState({
                            code: result.data.code
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
        if (this.props.location.state === undefined) {
            this.props.history.push('/login')
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
                    <div className={index.div}>
                        <p style={{textAlign: 'center'}}>已向您的邮箱发送6位验证码，请确认</p>
                        <Input.Group compact style={{textAlign: 'center'}}>
                            <Input ref={this.myRef} style={{width: 'calc(100% - 200px)'}}/>
                            <Button type="primary" onClick={this.handleOk}>确定</Button>
                            <Button style={{marginLeft: '10px'}} type="primary" onClick={this.reSend}>重新发送</Button>
                        </Input.Group>
                    </div>
                </>
            )
        }
    }
}

export default ChangePasswordChangePassword
