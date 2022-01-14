import React, {Component} from 'react';
import index from './index.module.css'
import {Button, DatePicker, Drawer, Input, List, message, Spin, Typography, Upload} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import {
    DownCircleOutlined,
    ExclamationCircleOutlined, UpCircleOutlined,
    UploadOutlined
} from "@ant-design/icons";
import prizeUp from "../../../../api/Achievements/prizeUp";
import getPrize from "../../../../api/Achievements/getPrize";
import prizeDown from "../../../../api/Achievements/prizeDown";
import getImageUrl from "../../../../api/Qiniu/getImageUrl";
import deletePrize from "../../../../api/Achievements/deletePrize";
import {v4 as uuidv4} from "uuid";
import getImageToken from "../../../../api/Qiniu/getImageToken";
import confirm from "antd/es/modal/confirm";
import checkPrize from "../../../../api/Achievements/checkPrize";
import modifyPrize from "../../../../api/Achievements/modifyPrize";
import addPrize from "../../../../api/Achievements/addPrize";
import timeConversion from "../../../../utils/TimeConversion";
import ImgCrop from "antd-img-crop";

const {Link} = Typography;

let isUnmount = false

class Prize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            operateI: null,
            operate: '',
            controller: new AbortController(),
            loading: true,
            prizes: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            newItem: {}
        }
    }

    moveUp = (item) => {
        return (async () => {
            if (this.state.prizes[0].title === item) {
                message.info('已经是第一个了')
            } else {
                let id
                for (let i = 0; i < this.state.prizes.length; i++) {
                    if (this.state.prizes[i].title === item) {
                        id = this.state.prizes[i].id
                    }
                }
                try {
                    await prizeUp(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('上移成功')
                                await getPrize(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    prizes: result.data.prizes
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
            if (this.state.prizes[this.state.prizes.length - 1].title === item) {
                message.info('已经是最后一个了')
            } else {
                let id
                for (let i = 0; i < this.state.prizes.length; i++) {
                    if (this.state.prizes[i].title === item) {
                        id = this.state.prizes[i].id
                    }
                }
                try {
                    await prizeDown(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('下移成功')
                                await getPrize(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    prizes: result.data.prizes
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
            for (let i = 0; i < this.state.prizes.length; i++) {
                if (this.state.prizes[i].title === item) {
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
            try {
                await getImageUrl(this.state.prizes[operateI].cover, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.prizes]
                            temp[operateI]['img'] = result.data.privateDownloadUrl
                            temp[operateI]['alt'] = `prizeImg${operateI}`
                            if (!isUnmount) {
                                this.setState({
                                    prizes: temp
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
        })
    }

    deleteItem = async (item) => {
        let id
        for (let i = 0; i < this.state.prizes.length; i++) {
            if (this.state.prizes[i].title === item) {
                id = this.state.prizes[i].id
            }
        }
        try {
            await deletePrize(id, this.state.controller.signal, 2).then(
                async result => {
                    if (result.code === 0) {
                        message.success('删除成功')
                        await getPrize(this.state.controller.signal, 2).then(
                            result => {
                                if (result.code === 0) {
                                    if (!isUnmount) {
                                        this.setState({
                                            prizes: result.data.prizes
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
                let temp = this.state.prizes
                temp[operateI].title = event.target.value
                if (!isUnmount) {
                    this.setState({
                        prizes: temp
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

    changeDate = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.prizes
                temp[operateI].date = Math.floor((event.valueOf()) / 1000)
                if (!isUnmount) {
                    this.setState({
                        prizes: temp
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

    changeUpload = async (info) => {
        if (info.file.status === 'done') {
            message.destroy('loading')
            message.success(`${info.file.name}上传成功`)
            if (this.state.operateI !== -1) {
                let temp = [...this.state.prizes]
                try {
                    temp[this.state.operateI].cover = this.state.fileName
                    await getImageUrl(this.state.prizes[this.state.operateI].cover, this.state.controller.signal, 2).then(
                        result => {
                            if (result.code === 0) {
                                temp[this.state.operateI]['img'] = result.data.privateDownloadUrl
                                if (!isUnmount) {
                                    this.setState({
                                        prizes: temp
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
            } else {
                let temp = {...this.state.newItem}
                try {
                    temp.cover = this.state.fileName
                    await getImageUrl(temp.cover, this.state.controller.signal, 2).then(
                        result => {
                            if (result.code === 0) {
                                temp['img'] = result.data.privateDownloadUrl
                                temp['alt'] = 'newImg'
                                if (!isUnmount) {
                                    this.setState({
                                        newItem: temp
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
        } else if (info.file.status === 'error') {
            message.destroy('loading')
            message.error(`${info.file.name}上传失败`);
        }
    }

    setFile = async (file) => {
        message.loading({
            content: `${file.name}上传中……`,
            key: 'loading',
            duration: 0
        })
        const fileName = uuidv4()
        if (!isUnmount) {
            await this.setState({
                fileList: [file],
                fileName: fileName
            })
        }
        try {
            await getImageToken(this.state.fileName, this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                uploadToken: result.data.uploadToken
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

    onClose = async () => {
        if (!isUnmount) {
            this.setState({
                visible: false
            })
        }
        try {
            await getPrize(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                prizes: result.data.prizes
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
        const {prizes} = this.state
        let flag = true
        for (let i = 0; i < prizes.length; i++) {
            if (prizes[i].cover === '' || prizes[i].date === '' || prizes[i].title === '') {
                flag = false
            }
        }
        if (flag === false) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            let oldTitle
            await getPrize(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        oldTitle = result.data.prizes[this.state.operateI].title
                    } else {
                        console.log(result.message)
                    }
                }
            )
            await checkPrize(prizes[this.state.operateI].title, oldTitle, this.state.controller.signal, 2).then(
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
            await checkPrize(newItem.title, '', this.state.controller.signal, 2).then(
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
                        message.warning('奖项名已存在，请更换')
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
                await modifyPrize(this.state.prizes[this.state.operateI], this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('修改成功')
                        } else {
                            message.error(`修改失败，错误为${result.message}`)
                        }
                    }
                )
            } else {
                await addPrize(this.state.newItem, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('添加成功')
                        } else {
                            message.error(`添加失败，错误为${result.message}`)
                        }
                    }
                )
            }
            await getPrize(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                prizes: result.data.prizes
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
                    cover: '',
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
            await getPrize(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                prizes: result.data.prizes
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
            const {visible, operateI, operate, prizes, newItem} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <>
                    <Title level={3}>奖项</Title>
                    <List
                        style={{background: 'white', marginTop: '20px'}}
                        size="large"
                        bordered
                        dataSource={prizes.map((d) => {
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
                                    <span>封面：</span>
                                    {newItem.cover === "" ?
                                        <ImgCrop aspect={315 / 220} quality={1}>
                                            <Upload
                                                beforeUpload={
                                                    file => this.setFile(file)
                                                }
                                                showUploadList={false}
                                                action={'http://up-z2.qiniup.com'}
                                                data={data}
                                                fileList={this.state.fileList}
                                                onChange={this.changeUpload}>
                                                <Button icon={<UploadOutlined/>}
                                                        style={{display: 'inline'}}>上传图片</Button>
                                            </Upload>
                                        </ImgCrop>
                                        :
                                        <>
                                            <img className={index.img} src={newItem.img}
                                                 alt={newItem.alt}/>
                                            <ImgCrop aspect={315 / 220} quality={1}>
                                                <Upload
                                                    beforeUpload={
                                                        file => this.setFile(file)
                                                    }
                                                    showUploadList={false}
                                                    action={'http://up-z2.qiniup.com'}
                                                    data={data}
                                                    fileList={this.state.fileList}
                                                    onChange={this.changeUpload}>
                                                    <Button icon={<UploadOutlined/>}
                                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                                </Upload>
                                            </ImgCrop>
                                        </>
                                    }
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>奖项：</span>
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
                                    <span>封面：</span>
                                    <img className={index.img} src={prizes[operateI].img} alt={prizes[operateI].alt}/>
                                    <ImgCrop aspect={315 / 220} quality={1}>
                                        <Upload
                                            beforeUpload={
                                                file => this.setFile(file)
                                            }
                                            showUploadList={false}
                                            action={'http://up-z2.qiniup.com'}
                                            data={data}
                                            fileList={this.state.fileList}
                                            onChange={this.changeUpload}>
                                            <Button icon={<UploadOutlined/>}
                                                    style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                        </Upload>
                                    </ImgCrop>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>标题：</span>
                                    <Input style={{width: '300px'}} value={prizes[operateI].title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>日期：</span>
                                    <DatePicker value={moment(timeConversion(prizes[operateI].date), 'YYYY-MM-DD')}
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

export default Prize