import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import {Button, Input, Spin, message} from "antd";
import {PlusCircleOutlined, MinusCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import index from './index.module.css'
import getIntroduction from "../../../../api/About/getIntroduction";
import setIntroduction from "../../../../api/About/setIntroduction";
import confirm from "antd/es/modal/confirm";

let isUnmount = false

class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            introduction: []
        }
    }

    changeInput = (i) => {
        return ((event) => {
            let temp = this.state.introduction
            temp[i] = event.target.value
            if (!isUnmount) {
                this.setState({
                    introduction: temp
                })
            }
        })
    }

    addItem = (i) => {
        return (() => {
            let temp = this.state.introduction
            temp.splice(i + 1, 0, '')
            if (!isUnmount) {
                this.setState({
                    introduction: temp
                })
            }
        })
    }

    deleteItem = (i) => {
        return (() => {
            let temp = this.state.introduction
            temp.splice(i, 1)
            if (!isUnmount) {
                this.setState({
                    introduction: temp
                })
            }
        })
    }

    indexFinishForm = () => {
        const introduction = this.state.introduction.join('$segment$')
        try {
            setIntroduction(introduction, this.state.controller.signal, 2).then(
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

    showConfirm = () => {
        const that = this
        confirm({
            title: '确认修改吗',
            icon: <ExclamationCircleOutlined/>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                that.indexFinishForm()
            },
            onCancel() {},
        });
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getIntroduction(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                introduction: result.data.introduction.split('$segment$')
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
            return (
                <div>
                    <Title level={3}>实验室简介</Title>
                    <Button style={{marginBottom: '13px', marginRight: '32px'}} className={index.smallButton}
                            onClick={this.addItem(-1)} type={'link'}
                            icon={<PlusCircleOutlined/>}/>
                    {this.state.introduction.map((d, i) => {
                        return (
                            <div style={{marginBottom: '45px'}} key={i}>
                                <Input.TextArea autoSize={true} value={d} onChange={this.changeInput(i)}/>
                                <Button className={index.smallButton} onClick={this.deleteItem(i)} type={'link'}
                                        icon={<MinusCircleOutlined/>}/>
                                <Button className={index.smallButton} onClick={this.addItem(i)} type={'link'}
                                        icon={<PlusCircleOutlined/>}/>
                            </div>
                        )
                    })}
                    <Button className={index.button} type="primary" onClick={this.showConfirm}>修改</Button>
                </div>
            )
        }
    }
}

export default Introduction