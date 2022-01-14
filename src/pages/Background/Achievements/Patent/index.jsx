import React, {Component} from 'react';
import {Button, DatePicker, Drawer, Input, List, message, Spin, Typography} from "antd";
import Title from "antd/es/typography/Title";
import {DownCircleOutlined, ExclamationCircleOutlined, UpCircleOutlined} from "@ant-design/icons";
import moment from 'moment';
import patentUp from "../../../../api/Achievements/patentUp";
import getPatent from "../../../../api/Achievements/getPatent";
import patentDown from "../../../../api/Achievements/patentDown";
import deletePatent from "../../../../api/Achievements/deletePatent";
import confirm from "antd/es/modal/confirm";
import checkPatent from "../../../../api/Achievements/checkPatent";
import modifyPatent from "../../../../api/Achievements/modifyPatent";
import addPatent from "../../../../api/Achievements/addPatent";
import index from "../Prize/index.module.css";
import timeConversion from "../../../../utils/TimeConversion";

const {Link} = Typography;

let isUnmount = false

class Patent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            operateI: null,
            operate: '',
            controller: new AbortController(),
            loading: true,
            patents: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            newItem: {}
        }
    }

    moveUp = (item) => {
        return (async () => {
            if (this.state.patents[0].title === item) {
                message.info('已经是第一个了')
            } else {
                let id
                for (let i = 0; i < this.state.patents.length; i++) {
                    if (this.state.patents[i].title === item) {
                        id = this.state.patents[i].id
                    }
                }
                try {
                    await patentUp(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('上移成功')
                                await getPatent(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    patents: result.data.patents
                                                })
                                            }
                                        } else {
                                            console.log(result.message)
                                        }
                                    }
                                )
                            } else {
                                message.error(`上移失败，错误为${result.message}`)
                            }
                        }
                    )
                } catch (e) {
                    console.log('e:', e)
                }
            }
        })
    }

    moveDown = (item) => {
        return (async () => {
            if (this.state.patents[this.state.patents.length - 1].title === item) {
                message.info('已经是最后一个了')
            } else {
                let id
                for (let i = 0; i < this.state.patents.length; i++) {
                    if (this.state.patents[i].title === item) {
                        id = this.state.patents[i].id
                    }
                }
                try {
                    await patentDown(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('下移成功')
                                await getPatent(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    patents: result.data.patents
                                                })
                                            }
                                        } else {
                                            console.log(result.message)
                                        }
                                    }
                                )
                            } else {
                                message.error(`下移失败，错误为${result.message}`)
                            }
                        }
                    )
                } catch (e) {
                    console.log('e:', e)
                }
            }
        })
    }

    modifyItem = (item) => {
        return (async () => {
            let operateI
            for (let i = 0; i < this.state.patents.length; i++) {
                if (this.state.patents[i].title === item) {
                    operateI = i
                }
            }
            if (!isUnmount) {
                await this.setState({
                    operateI: operateI,
                    visible: true,
                    operate: '修改'
                })
            }
        })
    }

    deleteItem = async (item) => {
        let id
        for (let i = 0; i < this.state.patents.length; i++) {
            if (this.state.patents[i].title === item) {
                id = this.state.patents[i].id
            }
        }
        try {
            await deletePatent(id, this.state.controller.signal, 2).then(
                async result => {
                    if (result.code === 0) {
                        message.success('删除成功')
                        await getPatent(this.state.controller.signal, 2).then(
                            result => {
                                if (result.code === 0) {
                                    if (!isUnmount) {
                                        this.setState({
                                            patents: result.data.patents
                                        })
                                    }
                                } else {
                                    console.log(result.message)
                                }
                            }
                        )
                    } else {
                        message.error(`删除失败，错误为${result.message}`)
                    }
                }
            )
        } catch (e) {
            console.log('e:', e)
        }
    }

    changeTitle = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.patents
                temp[operateI].title = event.target.value
                if (!isUnmount) {
                    this.setState({
                        patents: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.title = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeNumber = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.patents
                temp[operateI].number = event.target.value
                if (!isUnmount) {
                    this.setState({
                        patents: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.number = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeDate = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.patents
                temp[operateI].date = Math.floor((event.valueOf()) / 1000)
                if (!isUnmount) {
                    this.setState({
                        patents: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.date = Math.floor((event.valueOf()) / 1000)
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    onClose = async () => {
        if (!isUnmount) {
            this.setState({
                visible: false
            })
        }
        try {
            await getPatent(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                patents: result.data.patents
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
    }

    showConfirmModify = async () => {
        const {patents} = this.state
        let flag = true
        for (let i = 0; i < patents.length; i++) {
            if (patents[i].number === '' || patents[i].date === '' || patents[i].title === '') {
                flag = false
            }
        }
        if (flag === false) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            let oldTitle
            await getPatent(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        oldTitle = result.data.patents[this.state.operateI].title
                    } else {
                        console.log(result.message)
                    }
                }
            )
            await checkPatent(patents[this.state.operateI].title, oldTitle, this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        confirm({
                            title: '确认修改吗',
                            icon: <ExclamationCircleOutlined/>,
                            okText: '确定',
                            cancelText: '取消',
                            onOk() {
                                that.handleOk()
                            },
                            onCancel() {
                            },
                        });
                    } else {
                        message.warning('新闻名已存在，请更换')
                    }
                }
            )
        }
    }

    showConfirmAdd = async () => {
        const {newItem} = this.state
        if (newItem.cover === '' || newItem.date === '' || newItem.title === '') {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            await checkPatent(newItem.title, '', this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        confirm({
                            title: '确认添加吗',
                            icon: <ExclamationCircleOutlined/>,
                            okText: '确定',
                            cancelText: '取消',
                            onOk() {
                                that.handleOk()
                            },
                            onCancel() {
                            },
                        });
                    } else {
                        message.warning('专利名已存在，请更换')
                    }
                }
            )
        }
    }

    showConfirmDelete = (item) => {
        const that = this
        return (() => {
            confirm({
                title: '确认删除吗',
                icon: <ExclamationCircleOutlined/>,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    that.deleteItem(item)
                },
                onCancel() {
                },
            });
        })
    }

    handleOk = async () => {
        if (!isUnmount) {
            this.setState({
                visible: false
            })
        }
        try {
            if (this.state.operateI !== -1) {
                await modifyPatent(this.state.patents[this.state.operateI], this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('修改成功')
                        } else {
                            message.error(`修改失败，错误为${result.message}`)
                        }
                    }
                )
            } else {
                await addPatent(this.state.newItem, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('添加成功')
                        } else {
                            message.error(`添加失败，错误为${result.message}`)
                        }
                    }
                )
            }
            await getPatent(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                patents: result.data.patents
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
    }

    addItem = () => {
        if (!isUnmount) {
            this.setState({
                newItem: {
                    number: '',
                    title: '',
                    date: new Date().valueOf() / 1000
                },
                operateI: -1,
                operate: '新增',
                visible: true
            })
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getPatent(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                patents: result.data.patents
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
            const {visible, operateI, operate, patents, newItem} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <>
                    <Title level={3}>专利</Title>
                    <List
                        style={{background: 'white', marginTop: '20px'}}
                        size="large"
                        bordered
                        dataSource={patents.map((d) => {
                            return d.title
                        })}
                        renderItem={item => <List.Item
                            actions={[<Button onClick={this.moveUp(item)} type={'link'} icon={<UpCircleOutlined/>}/>,
                                <Button onClick={this.moveDown(item)} type={'link'} icon={<DownCircleOutlined/>}/>,
                                <Link onClick={this.modifyItem(item)}>修改</Link>,
                                <Link onClick={this.showConfirmDelete(item)}>删除</Link>
                            ]}>{item}</List.Item>}
                    />
                    <Button style={{marginTop: '20px'}} onClick={this.addItem}>
                        新增
                    </Button>
                    {operate === '' ? <></> : <Drawer
                        title={operate}
                        width={720}
                        onClose={this.onClose}
                        visible={visible}
                        bodyStyle={{paddingBottom: 80}}
                    >
                        {operate === '新增' ?
                            <div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>专利号：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.number}
                                           onChange={this.changeNumber(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>专利名：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>日期：</span>
                                    <DatePicker value={moment(timeConversion(this.state.newItem.date), 'YYYY-MM-DD')}
                                                onChange={this.changeDate(operateI)}/>
                                </div>
                                <Button style={{float: "right", marginRight: '30px', marginTop: '20px'}} type="primary"
                                        onClick={this.showConfirmAdd}>新增</Button>
                            </div>
                            :
                            <div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>专利号：</span>
                                    <Input style={{width: '300px'}} value={patents[operateI].number}
                                           onChange={this.changeNumber(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>专利名：</span>
                                    <Input style={{width: '300px'}} value={patents[operateI].title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>日期：</span>
                                    <DatePicker value={moment(timeConversion(patents[operateI].date), 'YYYY-MM-DD')}
                                                onChange={this.changeDate(operateI)}/>
                                </div>
                                <Button style={{float: "right", marginRight: '30px', marginTop: '20px'}} type="primary"
                                        onClick={this.showConfirmModify}>修改</Button>
                            </div>
                        }
                    </Drawer>}
                </>
            )
        }
    }
}

export default Patent