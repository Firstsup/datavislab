import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import {Button, Drawer, Input, List, message, Spin, Typography, Upload} from "antd";
import {
    DownCircleOutlined,
    ExclamationCircleOutlined, UpCircleOutlined, UploadOutlined, FilePdfOutlined
} from "@ant-design/icons";
import paperUp from "../../../../api/Achievements/paperUp";
import getPaper from "../../../../api/Achievements/getPaper";
import paperDown from "../../../../api/Achievements/paperDown";
import deletePaper from "../../../../api/Achievements/deletePaper";
import confirm from "antd/es/modal/confirm";
import checkPaper from "../../../../api/Achievements/checkPaper";
import modifyPaper from "../../../../api/Achievements/modifyPaper";
import addPaper from "../../../../api/Achievements/addPaper";
import index from "../../Directions/index.module.css";
import getFileUrl from "../../../../api/Qiniu/getFileUrl";
import {v4 as uuidv4} from "uuid";
import getFileToken from "../../../../api/Qiniu/getFileToken";
import findNth from "../../../../utils/findNth";

const {Link} = Typography;

let isUnmount = false

class Paper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            operateI: null,
            operate: '',
            controller: new AbortController(),
            loading: true,
            papers: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            newItem: {}
        }
    }

    moveUp = (item) => {
        return (async () => {
            if (this.state.papers[0].title === item) {
                message.info('已经是第一个了')
            } else {
                let id
                for (let i = 0; i < this.state.papers.length; i++) {
                    if (this.state.papers[i].title === item) {
                        id = this.state.papers[i].id
                    }
                }
                try {
                    await paperUp(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('上移成功')
                                await getPaper(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    papers: result.data.papers
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
            if (this.state.papers[this.state.papers.length - 1].title === item) {
                message.info('已经是最后一个了')
            } else {
                let id
                for (let i = 0; i < this.state.papers.length; i++) {
                    if (this.state.papers[i].title === item) {
                        id = this.state.papers[i].id
                    }
                }
                try {
                    await paperDown(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('下移成功')
                                await getPaper(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    papers: result.data.papers
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
            for (let i = 0; i < this.state.papers.length; i++) {
                if (this.state.papers[i].title === item) {
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
                await getFileUrl(this.state.papers[operateI].file, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.papers]
                            temp[operateI]['fileUrl'] = result.data.privateDownloadUrl
                            temp[operateI]['alt'] = `directionImg${operateI}`
                            if (!isUnmount) {
                                this.setState({
                                    papers: temp
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
        for (let i = 0; i < this.state.papers.length; i++) {
            if (this.state.papers[i].title === item) {
                id = this.state.papers[i].id
            }
        }
        try {
            await deletePaper(id, this.state.controller.signal, 2).then(
                async result => {
                    if (result.code === 0) {
                        message.success('删除成功')
                        await getPaper(this.state.controller.signal, 2).then(
                            result => {
                                if (result.code === 0) {
                                    if (!isUnmount) {
                                        this.setState({
                                            papers: result.data.papers
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
                let temp = this.state.papers
                temp[operateI].title = event.target.value
                if (!isUnmount) {
                    this.setState({
                        papers: temp
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

    changeVenue = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.papers
                temp[operateI].venue = event.target.value
                if (!isUnmount) {
                    this.setState({
                        papers: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.venue = event.target.value
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
                let temp = [...this.state.papers]
                try {
                    temp[this.state.operateI].file = this.state.fileName
                    temp[this.state.operateI].fileOriName = info.file.name
                    await getFileUrl(this.state.papers[this.state.operateI].file, this.state.controller.signal, 2).then(
                        result => {
                            if (result.code === 0) {
                                temp[this.state.operateI]['fileUrl'] = result.data.privateDownloadUrl
                                if (!isUnmount) {
                                    this.setState({
                                        papers: temp
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
                    temp.file = this.state.fileName
                    temp.fileOriName = info.file.name
                    await getFileUrl(temp.file, this.state.controller.signal, 2).then(
                        result => {
                            if (result.code === 0) {
                                temp['fileUrl'] = result.data.privateDownloadUrl
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
        const fileName = `${uuidv4()}.${file.name.substring(findNth(file.name, '.', 0) + 1)}`
        if (!isUnmount) {
            await this.setState({
                fileList: [file],
                fileName: fileName
            })
        }
        try {
            await getFileToken(this.state.fileName, this.state.controller.signal, 2).then(
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

    openFile = () => {
        if (this.state.operateI === -1) {
            window.open(this.state.newItem.fileUrl, '_parent')
        } else {
            window.open(this.state.papers[this.state.operateI].fileUrl, '_parent')
        }
    }

    onClose = async () => {
        if (!isUnmount) {
            this.setState({
                visible: false
            })
        }
        try {
            await getPaper(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                papers: result.data.papers
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
        const {papers} = this.state
        let flag = true
        for (let i = 0; i < papers.length; i++) {
            if (papers[i].title === '' || papers[i].venue === '' || papers[i].file === '') {
                flag = false
            }
        }
        if (flag === false) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            let oldTitle
            await getPaper(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        oldTitle = result.data.papers[this.state.operateI].title
                    } else {
                        console.log(result.message)
                    }
                }
            )
            await checkPaper(papers[this.state.operateI].title, oldTitle, this.state.controller.signal, 2).then(
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
                        message.warning('方向名已存在，请更换')
                    }
                }
            )
        }
    }

    showConfirmAdd = async () => {
        const {newItem} = this.state
        if (newItem.title === '' || newItem.venue === '' || newItem.file === '') {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            await checkPaper(newItem.title, '', this.state.controller.signal, 2).then(
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
                        message.warning('论文名已存在，请更换')
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
                await modifyPaper(this.state.papers[this.state.operateI], this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('修改成功')
                        } else {
                            message.error(`修改失败，错误为${result.message}`)
                        }
                    }
                )
            } else {
                await addPaper(this.state.newItem, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('添加成功')
                        } else {
                            message.error(`添加失败，错误为${result.message}`)
                        }
                    }
                )
            }
            await getPaper(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                papers: result.data.papers
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
                    title: '',
                    venue: '',
                    file: ''
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
            await getPaper(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                papers: result.data.papers
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
            const {visible, operateI, operate, papers, newItem} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <>
                    <Title level={3}>论文</Title>
                    <List
                        style={{background: 'white', marginTop: '20px'}}
                        size="large"
                        bordered
                        dataSource={papers.map((d) => {
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
                                    <span>论文名：</span>
                                    <Input style={{width: '300px'}} value={newItem.title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>期刊会议：</span>
                                    <Input style={{width: '300px'}} value={newItem.venue}
                                           onChange={this.changeVenue(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>文件：</span>
                                    {newItem.file === "" ?
                                        <>
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
                                                        style={{display: 'inline'}}>上传文件</Button>
                                            </Upload>
                                        </> :
                                        <>
                                            <span>{newItem.fileOriName}</span>
                                            <div style={{marginTop: '10px'}}/>
                                            <Button icon={<FilePdfOutlined/>}
                                                    style={{display: 'inline', marginLeft: '45px'}}
                                                    onClick={this.openFile}>预览文件</Button>
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
                                        </>
                                    }
                                </div>
                                <Button style={{float: "right", marginRight: '30px', marginTop: '20px'}} type="primary"
                                        onClick={this.showConfirmAdd}>新增</Button>
                            </div>
                            :
                            <div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>论文名：</span>
                                    <Input style={{width: '300px'}} value={papers[operateI].title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>期刊会议：</span>
                                    <Input style={{width: '300px'}} value={papers[operateI].venue}
                                           onChange={this.changeVenue(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>文件：</span>
                                    <span>{papers[operateI].fileOriName}</span>
                                    <div style={{marginTop: '10px'}}/>
                                    <Button icon={<FilePdfOutlined/>}
                                            style={{display: 'inline', marginLeft: '45px'}}
                                            onClick={this.openFile}>预览文件</Button>
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

export default Paper