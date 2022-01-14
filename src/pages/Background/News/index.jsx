import React, {Component} from 'react';
import index from './index.module.css'
import {Button, DatePicker, Drawer, Input, List, message, Spin, Typography, Upload} from "antd";
import Title from "antd/es/typography/Title";
import {
    DownCircleOutlined,
    ExclamationCircleOutlined, FileImageOutlined,
    MinusCircleOutlined, PlusCircleOutlined,
    UpCircleOutlined,
    UploadOutlined
} from "@ant-design/icons";
import moment from "moment";
import getAllNews from "../../../api/News/getAllNews";
import getImageUrl from "../../../api/Qiniu/getImageUrl";
import newsUp from "../../../api/News/newsUp";
import newsDown from "../../../api/News/newsDown";
import deleteNews from "../../../api/News/deleteNews";
import confirm from "antd/es/modal/confirm";
import modifyNews from "../../../api/News/modifyNews";
import timeConversion from "../../../utils/TimeConversion";
import {v4 as uuidv4} from "uuid";
import getImageToken from "../../../api/Qiniu/getImageToken";
import findNth from "../../../utils/findNth";
import addNews from "../../../api/News/addNews";
import checkNews from "../../../api/News/checkNews";
import ImgCrop from "antd-img-crop";

const {Link} = Typography;

let isUnmount = false

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            operateI: null,
            operate: '',
            controller: new AbortController(),
            loading: true,
            news: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            newItem: {}
        }
    }

    moveUp = (item) => {
        return (async () => {
            if (this.state.news[0].title === item) {
                message.info('已经是第一个了')
            } else {
                let id
                for (let i = 0; i < this.state.news.length; i++) {
                    if (this.state.news[i].title === item) {
                        id = this.state.news[i].id
                    }
                }
                try {
                    await newsUp(id, this.state.controller.signal, 1).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('上移成功')
                                await getAllNews(this.state.controller.signal, 1).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    news: result.data.news
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
            if (this.state.news[this.state.news.length - 1].title === item) {
                message.info('已经是最后一个了')
            } else {
                let id
                for (let i = 0; i < this.state.news.length; i++) {
                    if (this.state.news[i].title === item) {
                        id = this.state.news[i].id
                    }
                }
                try {
                    await newsDown(id, this.state.controller.signal, 1).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('下移成功')
                                await getAllNews(this.state.controller.signal, 1).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    news: result.data.news
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
            for (let i = 0; i < this.state.news.length; i++) {
                if (this.state.news[i].title === item) {
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
                await getImageUrl(this.state.news[operateI].cover, this.state.controller.signal, 1).then(
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.news]
                            temp[operateI]['img'] = result.data.privateDownloadUrl
                            temp[operateI]['alt'] = `newsImg${operateI}`
                            if (!isUnmount) {
                                this.setState({
                                    news: temp
                                })
                            }
                        } else {
                            console.log(result.message)
                        }
                    }
                )
                for (let i = 0; i < this.state.news[operateI].content.length; i++) {
                    if (this.state.news[operateI].content[i].startsWith('$image$')) {
                        await getImageUrl(this.state.news[operateI].content[i].substring(7), this.state.controller.signal, 1).then(
                            // eslint-disable-next-line no-loop-func
                            result => {
                                if (result.code === 0) {
                                    let temp = [...this.state.news]
                                    temp[operateI].content[i] = `${temp[operateI].content[i]}$url$${result.data.privateDownloadUrl}`
                                    if (!isUnmount) {
                                        this.setState({
                                            news: temp
                                        })
                                    }
                                } else {
                                    console.log(result.message)
                                }
                            }
                        )
                    }
                }
            } catch (e) {
                console.log('e:', e)
            }
        })
    }

    deleteItem = async (item) => {
        let id
        for (let i = 0; i < this.state.news.length; i++) {
            if (this.state.news[i].title === item) {
                id = this.state.news[i].id
            }
        }
        try {
            await deleteNews(id, this.state.controller.signal, 1).then(
                async result => {
                    if (result.code === 0) {
                        message.success('删除成功')
                        await getAllNews(this.state.controller.signal, 1).then(
                            result => {
                                if (result.code === 0) {
                                    if (!isUnmount) {
                                        this.setState({
                                            news: result.data.news
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
                let temp = this.state.news
                temp[operateI].title = event.target.value
                if (!isUnmount) {
                    this.setState({
                        news: temp
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
                let temp = this.state.news
                temp[operateI].date = Math.floor((event.valueOf()) / 1000)
                if (!isUnmount) {
                    this.setState({
                        news: temp
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

    changeContent = (operateI, i) => {
        return (event => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.news]
                temp[operateI].content[i] = event.target.value
                if (!isUnmount) {
                    this.setState({
                        news: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.content[i] = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeUpload = (item, order) => {
        return (async (info) => {
            if (info.file.status === 'done') {
                message.destroy('loading')
                message.success(`${info.file.name}上传成功`)
                if (this.state.operateI !== -1) {
                    let temp = [...this.state.news]
                    try {
                        if (item === 0) {
                            temp[this.state.operateI].cover = this.state.fileName
                            await getImageUrl(this.state.news[this.state.operateI].cover, this.state.controller.signal, 1).then(
                                result => {
                                    if (result.code === 0) {
                                        temp[this.state.operateI]['img'] = result.data.privateDownloadUrl
                                        if (!isUnmount) {
                                            this.setState({
                                                news: temp
                                            })
                                        }
                                    } else {
                                        console.log(result.message)
                                    }
                                }
                            )
                        } else {
                            temp[this.state.operateI].content[order] = `$image$${this.state.fileName}`
                            await getImageUrl(this.state.news[this.state.operateI].content[order].substring(7), this.state.controller.signal, 1).then(
                                result => {
                                    if (result.code === 0) {
                                        temp[this.state.operateI].content[order] = `$image$${this.state.fileName}$url$${result.data.privateDownloadUrl}`
                                        if (!isUnmount) {
                                            this.setState({
                                                news: temp
                                            })
                                        }
                                    } else {
                                        console.log(result.message)
                                    }
                                }
                            )
                        }
                    } catch (e) {
                        console.log('e:', e)
                    }
                } else {
                    let temp = {...this.state.newItem}
                    try {
                        if (item === 0) {
                            temp.cover = this.state.fileName
                            await getImageUrl(temp.cover, this.state.controller.signal, 1).then(
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
                        } else {
                            temp.content[order] = `$image$${this.state.fileName}`
                            await getImageUrl(temp.content[order].substring(7), this.state.controller.signal, 1).then(
                                result => {
                                    if (result.code === 0) {
                                        temp.content[order] = `$image$${this.state.fileName}$url$${result.data.privateDownloadUrl}`
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
                        }
                    } catch (e) {
                        console.log('e:', e)
                    }
                }
            } else if (info.file.status === 'error') {
                message.destroy('loading')
                message.error(`${info.file.name}上传失败`);
            }
        })
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
            await getImageToken(this.state.fileName, this.state.controller.signal, 1).then(
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

    addContentImg = (i) => {
        return (() => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.news]
                temp[this.state.operateI].content.splice(i + 1, 0, '$image$')
                if (!isUnmount) {
                    this.setState({
                        news: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.content.splice(i + 1, 0, '$image$')
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    addContentItem = (i) => {
        return (() => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.news]
                temp[this.state.operateI].content.splice(i + 1, 0, '')
                if (!isUnmount) {
                    this.setState({
                        news: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.content.splice(i + 1, 0, '')
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    deleteContentItem = (i) => {
        return (() => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.news]
                temp[this.state.operateI].content.splice(i, 1)
                if (!isUnmount) {
                    this.setState({
                        news: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.content.splice(i, 1)
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
            await getAllNews(this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                news: result.data.news
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
        const {news} = this.state
        let flag = true
        for (let i = 0; i < news.length; i++) {
            if (news[i].cover === '' || news[i].date === '' || news[i].title === '' || news[i].content.length === 0) {
                flag = false
            }
        }
        if (flag === false) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            let oldTitle
            await getAllNews(this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        oldTitle = result.data.news[this.state.operateI].title
                    } else {
                        console.log(result.message)
                    }
                }
            )
            await checkNews(news[this.state.operateI].title, oldTitle, this.state.controller.signal, 1).then(
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
        if (newItem.cover === '' || newItem.date === '' || newItem.title === '' || newItem.content.length === 0) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            await checkNews(newItem.title, '', this.state.controller.signal, 1).then(
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
                        message.warning('新闻名已存在，请更换')
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
                let temp = [...this.state.news]
                for (let i = 0; i < temp[this.state.operateI].content.length; i++) {
                    if (temp[this.state.operateI].content[i].includes('$url$')) {
                        temp[this.state.operateI].content[i] = temp[this.state.operateI].content[i].substring(0, findNth(temp[this.state.operateI].content[i], '$', 2))
                    }
                }
                if (!isUnmount) {
                    await this.setState({
                        news: temp
                    })
                }
                await modifyNews(this.state.news[this.state.operateI], this.state.controller.signal, 1).then(
                    result => {
                        if (result.code === 0) {
                            message.success('修改成功')
                        } else {
                            message.error(`修改失败，错误为${result.message}`)
                        }
                    }
                )
            } else {
                let temp = {...this.state.newItem}
                for (let i = 0; i < temp.content.length; i++) {
                    if (temp.content[i].includes('$url$')) {
                        temp.content[i] = temp.content[i].substring(0, findNth(temp.content[i], '$', 2))
                    }
                }
                if (!isUnmount) {
                    await this.setState({
                        newItem: temp
                    })
                }
                await addNews(this.state.newItem, this.state.controller.signal, 1).then(
                    result => {
                        if (result.code === 0) {
                            message.success('添加成功')
                        } else {
                            message.error(`添加失败，错误为${result.message}`)
                        }
                    }
                )
            }
            await getAllNews(this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                news: result.data.news
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
                    date: new Date().valueOf() / 1000,
                    content: []
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
            await getAllNews(this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                news: result.data.news
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
            const {visible, operateI, operate, news, newItem} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <>
                    <Title level={3}>新闻</Title>
                    <List
                        style={{background: 'white', marginTop: '20px'}}
                        size="large"
                        bordered
                        dataSource={news.map((d) => {
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
                                        <ImgCrop aspect={220 / 140} quality={1}>
                                            <Upload
                                                beforeUpload={
                                                    file => this.setFile(file)
                                                }
                                                showUploadList={false}
                                                action={'http://up-z2.qiniup.com'}
                                                data={data}
                                                fileList={this.state.fileList}
                                                onChange={this.changeUpload(0)}>
                                                <Button icon={<UploadOutlined/>}
                                                        style={{display: 'inline'}}>上传图片</Button>
                                            </Upload>
                                        </ImgCrop>
                                        :
                                        <>
                                            <img className={index.img} src={newItem.img}
                                                 alt={newItem.alt}/>
                                            <ImgCrop aspect={220 / 140} quality={1}>
                                                <Upload
                                                    beforeUpload={
                                                        file => this.setFile(file)
                                                    }
                                                    showUploadList={false}
                                                    action={'http://up-z2.qiniup.com'}
                                                    data={data}
                                                    fileList={this.state.fileList}
                                                    onChange={this.changeUpload(0)}>
                                                    <Button icon={<UploadOutlined/>}
                                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                                </Upload>
                                            </ImgCrop>
                                        </>
                                    }
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>标题：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>日期：</span>
                                    <DatePicker value={moment(timeConversion(this.state.newItem.date), 'YYYY-MM-DD')}
                                                onChange={this.changeDate(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>内容：</span>
                                    <Button style={{marginRight: '32px'}} className={index.smallButton}
                                            onClick={this.addContentItem(-1)}
                                            type={'link'}
                                            icon={<PlusCircleOutlined/>}/>
                                    <Button className={index.smallButton}
                                            onClick={this.addContentImg(-1)}
                                            type={'link'}
                                            icon={<FileImageOutlined/>}/>
                                    {newItem.content.map((d, i) => {
                                        if (d.startsWith('$image$')) {
                                            if (d === '$image$') {
                                                return (
                                                    <div style={{marginTop: '10px', height: '70px'}} key={i}>
                                                        <ImgCrop aspect={220 / 140} quality={1}>
                                                            <Upload
                                                                beforeUpload={
                                                                    file => this.setFile(file)
                                                                }
                                                                showUploadList={false}
                                                                action={'http://up-z2.qiniup.com'}
                                                                data={data}
                                                                fileList={this.state.fileList}
                                                                onChange={this.changeUpload(1, i)}>
                                                                <Button type={'primary'} icon={<UploadOutlined/>}
                                                                        style={{
                                                                            display: 'inline'
                                                                        }}>上传图片</Button>
                                                            </Upload>
                                                        </ImgCrop>
                                                        <Button style={{marginTop: '30px', marginRight: '400px'}}
                                                                className={index.smallButton}
                                                                onClick={this.deleteContentItem(i)}
                                                                type={'link'}
                                                                icon={<MinusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '30px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentItem(i)}
                                                                type={'link'}
                                                                icon={<PlusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '30px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentImg(i)}
                                                                type={'link'}
                                                                icon={<FileImageOutlined/>}/>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div style={{marginTop: '10px'}} key={i}>
                                                        {d.includes('url') ? <img className={index.img}
                                                                                  src={d.substring(d.lastIndexOf('$') + 1)}
                                                                                  alt={d.substring(findNth(d, '$', 1) + 1, findNth(d, '$', 2))}/> : <></>}
                                                        <ImgCrop aspect={220 / 140} quality={1}>
                                                            <Upload
                                                                beforeUpload={
                                                                    file => this.setFile(file)
                                                                }
                                                                showUploadList={false}
                                                                action={'http://up-z2.qiniup.com'}
                                                                data={data}
                                                                fileList={this.state.fileList}
                                                                onChange={this.changeUpload(1, i)}>
                                                                <Button icon={<UploadOutlined/>}
                                                                        style={{
                                                                            display: 'inline',
                                                                            marginLeft: '30px'
                                                                        }}>替换</Button>
                                                            </Upload>
                                                        </ImgCrop>
                                                        <Button style={{marginTop: '110px', marginRight: '100px'}}
                                                                className={index.smallButton}
                                                                onClick={this.deleteContentItem(i)}
                                                                type={'link'}
                                                                icon={<MinusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '110px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentItem(i)}
                                                                type={'link'}
                                                                icon={<PlusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '110px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentImg(i)}
                                                                type={'link'}
                                                                icon={<FileImageOutlined/>}/>
                                                    </div>
                                                )
                                            }
                                        } else {
                                            return (
                                                <div key={i} style={{minHeight: '80px'}}>
                                                    <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                                    value={d}
                                                                    onChange={this.changeContent(operateI, i)}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.deleteContentItem(i)}
                                                            type={'link'}
                                                            icon={<MinusCircleOutlined/>}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.addContentItem(i)}
                                                            type={'link'}
                                                            icon={<PlusCircleOutlined/>}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.addContentImg(i)}
                                                            type={'link'}
                                                            icon={<FileImageOutlined/>}/>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <Button style={{float: "right", marginRight: '30px', marginTop: '20px'}} type="primary"
                                        onClick={this.showConfirmAdd}>新增</Button>
                            </div>
                            :
                            <div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>封面：</span>
                                    <img className={index.img} src={news[operateI].img} alt={news[operateI].alt}/>
                                    <ImgCrop aspect={220 / 140} quality={1}>
                                        <Upload
                                            beforeUpload={
                                                file => this.setFile(file)
                                            }
                                            showUploadList={false}
                                            action={'http://up-z2.qiniup.com'}
                                            data={data}
                                            fileList={this.state.fileList}
                                            onChange={this.changeUpload(0)}>
                                            <Button icon={<UploadOutlined/>}
                                                    style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                        </Upload>
                                    </ImgCrop>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>标题：</span>
                                    <Input style={{width: '300px'}} value={news[operateI].title}
                                           onChange={this.changeTitle(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>日期：</span>
                                    <DatePicker value={moment(timeConversion(news[operateI].date), 'YYYY-MM-DD')}
                                                onChange={this.changeDate(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>内容：</span>
                                    <Button style={{marginRight: '32px'}} className={index.smallButton}
                                            onClick={this.addContentItem(-1)}
                                            type={'link'}
                                            icon={<PlusCircleOutlined/>}/>
                                    <Button className={index.smallButton}
                                            onClick={this.addContentImg(-1)}
                                            type={'link'}
                                            icon={<FileImageOutlined/>}/>
                                    {news[operateI].content.map((d, i) => {
                                        if (d.startsWith('$image$')) {
                                            if (d === '$image$') {
                                                return (
                                                    <div style={{marginTop: '10px', height: '70px'}} key={i}>
                                                        <ImgCrop aspect={220 / 140} quality={1}>
                                                            <Upload
                                                                beforeUpload={
                                                                    file => this.setFile(file)
                                                                }
                                                                showUploadList={false}
                                                                action={'http://up-z2.qiniup.com'}
                                                                data={data}
                                                                fileList={this.state.fileList}
                                                                onChange={this.changeUpload(1, i)}>
                                                                <Button type={'primary'} icon={<UploadOutlined/>}
                                                                        style={{
                                                                            display: 'inline'
                                                                        }}>上传图片</Button>
                                                            </Upload>
                                                        </ImgCrop>
                                                        <Button style={{marginTop: '30px', marginRight: '400px'}}
                                                                className={index.smallButton}
                                                                onClick={this.deleteContentItem(i)}
                                                                type={'link'}
                                                                icon={<MinusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '30px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentItem(i)}
                                                                type={'link'}
                                                                icon={<PlusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '30px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentImg(i)}
                                                                type={'link'}
                                                                icon={<FileImageOutlined/>}/>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div style={{marginTop: '10px'}} key={i}>
                                                        {d.includes('url') ? <img className={index.img}
                                                                                  src={d.substring(d.lastIndexOf('$') + 1)}
                                                                                  alt={d.substring(findNth(d, '$', 1) + 1, findNth(d, '$', 2))}/> : <></>}
                                                        <ImgCrop aspect={220 / 140} quality={1}>
                                                            <Upload
                                                                beforeUpload={
                                                                    file => this.setFile(file)
                                                                }
                                                                showUploadList={false}
                                                                action={'http://up-z2.qiniup.com'}
                                                                data={data}
                                                                fileList={this.state.fileList}
                                                                onChange={this.changeUpload(1, i)}>
                                                                <Button icon={<UploadOutlined/>}
                                                                        style={{
                                                                            display: 'inline',
                                                                            marginLeft: '30px'
                                                                        }}>替换</Button>
                                                            </Upload>
                                                        </ImgCrop>
                                                        <Button style={{marginTop: '110px', marginRight: '100px'}}
                                                                className={index.smallButton}
                                                                onClick={this.deleteContentItem(i)}
                                                                type={'link'}
                                                                icon={<MinusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '110px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentItem(i)}
                                                                type={'link'}
                                                                icon={<PlusCircleOutlined/>}/>
                                                        <Button style={{marginTop: '110px'}}
                                                                className={index.smallButton}
                                                                onClick={this.addContentImg(i)}
                                                                type={'link'}
                                                                icon={<FileImageOutlined/>}/>
                                                    </div>
                                                )
                                            }
                                        } else {
                                            return (
                                                <div key={i} style={{minHeight: '80px'}}>
                                                    <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                                    value={d}
                                                                    onChange={this.changeContent(operateI, i)}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.deleteContentItem(i)}
                                                            type={'link'}
                                                            icon={<MinusCircleOutlined/>}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.addContentItem(i)}
                                                            type={'link'}
                                                            icon={<PlusCircleOutlined/>}/>
                                                    <Button className={index.smallButton}
                                                            onClick={this.addContentImg(i)}
                                                            type={'link'}
                                                            icon={<FileImageOutlined/>}/>
                                                </div>
                                            )
                                        }
                                    })}
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

export default News