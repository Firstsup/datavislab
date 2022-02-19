import React, {Component} from 'react';
import index from './index.module.css'
import {Button, Drawer, Input, List, message, Spin, Typography, Upload} from "antd";
import Title from "antd/es/typography/Title";
import {
    DownCircleOutlined,
    ExclamationCircleOutlined, MinusCircleOutlined,
    PlusCircleOutlined,
    UpCircleOutlined,
    UploadOutlined
} from "@ant-design/icons";
import teacherUp from "../../../../api/Team/teacherUp";
import getTeacher from "../../../../api/Team/getTeacher";
import teacherDown from "../../../../api/Team/teacherDown";
import getImageUrl from "../../../../api/Qiniu/getImageUrl";
import deleteTeacher from "../../../../api/Team/deleteTeacher";
import {v4 as uuidv4} from "uuid";
import getImageToken from "../../../../api/Qiniu/getImageToken";
import confirm from "antd/es/modal/confirm";
import checkTeacher from "../../../../api/Team/checkTeacher";
import modifyTeacher from "../../../../api/Team/modifyTeacher";
import addTeacher from "../../../../api/Team/addTeacher";
import ImgCrop from "antd-img-crop";
import cookie from "react-cookies";

const {Link} = Typography;

let isUnmount = false

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            operateI: null,
            operate: '',
            controller: new AbortController(),
            loading: true,
            teachers: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            newItem: {}
        }
    }

    moveUp = (item) => {
        return (async () => {
            if (this.state.teachers[0].name === item) {
                message.info('已经是第一个了')
            } else {
                let id
                for (let i = 0; i < this.state.teachers.length; i++) {
                    if (this.state.teachers[i].name === item) {
                        id = this.state.teachers[i].id
                    }
                }
                try {
                    await teacherUp(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('上移成功')
                                await getTeacher(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    teachers: result.data.teachers
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
            if (this.state.teachers[this.state.teachers.length - 1].name === item) {
                message.info('已经是最后一个了')
            } else {
                let id
                for (let i = 0; i < this.state.teachers.length; i++) {
                    if (this.state.teachers[i].name === item) {
                        id = this.state.teachers[i].id
                    }
                }
                try {
                    await teacherDown(id, this.state.controller.signal, 2).then(
                        async result => {
                            if (result.code === 0) {
                                message.success('下移成功')
                                await getTeacher(this.state.controller.signal, 2).then(
                                    result => {
                                        if (result.code === 0) {
                                            if (!isUnmount) {
                                                this.setState({
                                                    teachers: result.data.teachers
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
            for (let i = 0; i < this.state.teachers.length; i++) {
                if (this.state.teachers[i].name === item) {
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
                await getImageUrl(this.state.teachers[operateI].cover, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.teachers]
                            temp[operateI]['img'] = result.data.privateDownloadUrl
                            temp[operateI]['alt'] = `studentImg${operateI}`
                            if (!isUnmount) {
                                this.setState({
                                    teachers: temp
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
        for (let i = 0; i < this.state.teachers.length; i++) {
            if (this.state.teachers[i].name === item) {
                id = this.state.teachers[i].id
            }
        }
        try {
            await deleteTeacher(id, this.state.controller.signal, 2).then(
                async result => {
                    if (result.code === 0) {
                        message.success('删除成功')
                        await getTeacher(this.state.controller.signal, 2).then(
                            result => {
                                if (result.code === 0) {
                                    if (!isUnmount) {
                                        this.setState({
                                            teachers: result.data.teachers
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

    changeName = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.teachers
                temp[operateI].name = event.target.value
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.name = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeResearch = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.teachers
                temp[operateI].research = event.target.value
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.research = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeEmail = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.teachers
                temp[operateI].email = event.target.value
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.email = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeIntroduction = (operateI) => {
        return (event => {
            if (operateI !== -1) {
                let temp = this.state.teachers
                temp[operateI].introduction = event.target.value
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = this.state.newItem
                temp.introduction = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    changeHonor = (operateI, i) => {
        return (event => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.teachers]
                temp[operateI].honor[i] = event.target.value
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.honor[i] = event.target.value
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    addHonorItem = (i) => {
        return (() => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.teachers]
                temp[this.state.operateI].honor.splice(i + 1, 0, '')
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.honor.splice(i + 1, 0, '')
                if (!isUnmount) {
                    this.setState({
                        newItem: temp
                    })
                }
            }
        })
    }

    deleteHonorItem = (i) => {
        return (() => {
            if (this.state.operateI !== -1) {
                let temp = [...this.state.teachers]
                temp[this.state.operateI].honor.splice(i, 1)
                if (!isUnmount) {
                    this.setState({
                        teachers: temp
                    })
                }
            } else {
                let temp = {...this.state.newItem}
                temp.honor.splice(i, 1)
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
                let temp = [...this.state.teachers]
                try {
                    temp[this.state.operateI].cover = this.state.fileName
                    await getImageUrl(this.state.teachers[this.state.operateI].cover, this.state.controller.signal, 2).then(
                        result => {
                            if (result.code === 0) {
                                temp[this.state.operateI]['img'] = result.data.privateDownloadUrl
                                if (!isUnmount) {
                                    this.setState({
                                        teachers: temp
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
            await getTeacher(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                teachers: result.data.teachers
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
        const {teachers} = this.state
        let flag = true
        for (let i = 0; i < teachers.length; i++) {
            if (teachers[i].cover === '' || teachers[i].name === '' || teachers[i].research === '' || teachers[i].email === '' || teachers[i].introduction === '' || teachers[i].honor.length === 0) {
                flag = false
            }
        }
        if (flag === false) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            let oldName
            await getTeacher(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        oldName = result.data.teachers[this.state.operateI].name
                    } else {
                        console.log(result.message)
                    }
                }
            )
            await checkTeacher(teachers[this.state.operateI].name, oldName, this.state.controller.signal, 2).then(
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
                        message.warning('姓名已存在，请更换')
                    }
                }
            )
        }
    }

    showConfirmAdd = async () => {
        const {newItem} = this.state
        if (newItem.cover === '' || newItem.name === '' || newItem.research === '' || newItem.email === '' || newItem.introduction === '' || newItem.honor.length === 0) {
            message.warning('请将信息填写完整')
        } else {
            const that = this
            await checkTeacher(newItem.name, '', this.state.controller.signal, 2).then(
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
                        message.warning('姓名已存在，请更换')
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
                await modifyTeacher(this.state.teachers[this.state.operateI], this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('修改成功')
                        } else {
                            message.error(`修改失败，错误为${result.message}`)
                        }
                    }
                )
            } else {
                await addTeacher(this.state.newItem, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            message.success('添加成功')
                        } else {
                            message.error(`添加失败，错误为${result.message}`)
                        }
                    }
                )
            }
            await getTeacher(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                teachers: result.data.teachers
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
                    name: '',
                    research: '',
                    email: '',
                    introduction: '',
                    honor: []
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
            await getTeacher(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                teachers: result.data.teachers
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
        if (cookie.load('admin') === undefined) {
            this.props.history.push('/background/login')
        }
        if (this.state.loading === true) {
            return (
                <div className={index.spin}>
                    <Spin size={"large"}/>
                </div>
            )
        } else {
            const {visible, operateI, operate, teachers, newItem} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <>
                    <Title level={3}>教师</Title>
                    <List
                        style={{background: 'white', marginTop: '20px'}}
                        size="large"
                        bordered
                        dataSource={teachers.map((d) => {
                            return d.name
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
                                    <span>照片：</span>
                                    {newItem.cover === "" ?
                                        <ImgCrop aspect={147 / 186} quality={1}>
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
                                                        style={{display: 'inline'}}>上传照片</Button>
                                            </Upload>
                                        </ImgCrop>
                                        :
                                        <>
                                            <img className={index.img} src={newItem.img}
                                                 alt={newItem.alt}/>
                                            <ImgCrop aspect={147 / 186} quality={1}>
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
                                    <span>姓名：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.name}
                                           onChange={this.changeName(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>研究方向：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.research}
                                           onChange={this.changeResearch(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>邮箱：</span>
                                    <Input style={{width: '300px'}} value={this.state.newItem.email}
                                           onChange={this.changeEmail(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>个人介绍：</span>
                                    <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                    value={this.state.newItem.introduction}
                                                    onChange={this.changeIntroduction(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>内容：</span>
                                    <Button style={{marginRight: '32px'}} className={index.smallButton}
                                            onClick={this.addHonorItem(-1)}
                                            type={'link'}
                                            icon={<PlusCircleOutlined/>}/>
                                    {newItem.honor.map((d, i) => {
                                        return (
                                            <div key={i} style={{minHeight: '80px'}}>
                                                <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                                value={d}
                                                                onChange={this.changeHonor(operateI, i)}/>
                                                <Button className={index.smallButton}
                                                        onClick={this.deleteHonorItem(i)}
                                                        type={'link'}
                                                        icon={<MinusCircleOutlined/>}/>
                                                <Button className={index.smallButton}
                                                        onClick={this.addHonorItem(i)}
                                                        type={'link'}
                                                        icon={<PlusCircleOutlined/>}/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <Button style={{float: "right", marginRight: '30px', marginTop: '20px'}} type="primary"
                                        onClick={this.showConfirmAdd}>新增</Button>
                            </div>
                            :
                            <div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>照片：</span>
                                    <img className={index.img} src={teachers[operateI].img}
                                         alt={teachers[operateI].alt}/>
                                    <ImgCrop aspect={147 / 186} quality={1}>
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
                                    <span>姓名：</span>
                                    <Input style={{width: '300px'}} value={teachers[operateI].name}
                                           onChange={this.changeName(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>研究方向：</span>
                                    <Input style={{width: '300px'}} value={teachers[operateI].research}
                                           onChange={this.changeResearch(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>邮箱：</span>
                                    <Input style={{width: '300px'}} value={teachers[operateI].email}
                                           onChange={this.changeEmail(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>个人介绍：</span>
                                    <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                    value={teachers[operateI].introduction}
                                                    onChange={this.changeIntroduction(operateI)}/>
                                </div>
                                <div className={index.div}>
                                    <span className={index.star}>*</span>
                                    <span>内容：</span>
                                    <Button style={{marginRight: '32px'}} className={index.smallButton}
                                            onClick={this.addHonorItem(-1)}
                                            type={'link'}
                                            icon={<PlusCircleOutlined/>}/>
                                    {teachers[operateI].honor.map((d, i) => {
                                        return (
                                            <div key={i} style={{minHeight: '80px'}}>
                                                <Input.TextArea style={{marginTop: '10px'}} autoSize={true}
                                                                value={d}
                                                                onChange={this.changeHonor(operateI, i)}/>
                                                <Button className={index.smallButton}
                                                        onClick={this.deleteHonorItem(i)}
                                                        type={'link'}
                                                        icon={<MinusCircleOutlined/>}/>
                                                <Button className={index.smallButton}
                                                        onClick={this.addHonorItem(i)}
                                                        type={'link'}
                                                        icon={<PlusCircleOutlined/>}/>
                                            </div>
                                        )
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

export default Teachers
