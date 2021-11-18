import React, {Component} from 'react';
import index from './index.module.css'
import {Button, Drawer, Form, Input, List, message, Typography, Upload} from "antd";
import Title from "antd/es/typography/Title";
import {DownCircleOutlined, UpCircleOutlined, UploadOutlined} from "@ant-design/icons";

const {Link} = Typography;

const teachers = [
    {
        img: '/图片1.jfif',
        name: '图片1',
        research: '方向1',
        email: '123123123@qq.com',
        introduction: '我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。我是一些简介。',
        honor: ['荣誉1', '荣誉2']
    }
]
const data = teachers.map((d) => {
    return d.name
})
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            i: '',
            operate: '修改'
        }
        this.formRef = React.createRef()
    }

    moveUp = (item) => {
        return (() => {
            if (item === data[0]) {
                message.info('已经是第一个了').then(r => {
                })
            } else {
                const i = data.indexOf(item)
                data[i] = data[i - 1]
                data[i - 1] = item
                //fetch
            }
        })
    }

    moveDown = (item) => {
        return (() => {
            if (item === data[data.length - 1]) {
                message.info('已经是最后一个了').then(r => {
                })
            } else {
                const i = data.indexOf(item)
                data[i] = data[i + 1]
                data[i + 1] = item
                //fetch
            }
        })
    }

    modifyItem = (item) => {
        return (() => {
            this.setState({
                i: data.indexOf(item),
                visible: true,
                operate: '修改'
            }, () => {
                if (this.formRef.current !== null) {
                    this.formRef.current.resetFields(['name', teachers[this.state.i].name])
                    this.formRef.current.resetFields(['email', teachers[this.state.i].email])
                    this.formRef.current.resetFields(['research', teachers[this.state.i].research])
                    this.formRef.current.resetFields(['introduction', teachers[this.state.i].introduction])
                    this.formRef.current.resetFields(['honor', teachers[this.state.i].honor])
                }
            })
        })
    }

    deleteItem = (item) => {
        return (() => {
            data.splice(data.indexOf(item), 1)
            console.log(data)
        })
    }

    onClose = () => {
        this.setState({
            i: '',
            visible: false
        })
    }

    handleOk = (value) => {
        this.setState({
            i: '',
            visible: false
        })
        console.log(value)
        //注意honor的格式（可能是数组，可能是字符串）
        //fetch
    }

    addItem = () => {
        this.setState({
            operate: '新增',
            visible: true
        }, () => {
            if (this.formRef.current !== null) {
                this.formRef.current.resetFields(['name', ''])
                this.formRef.current.resetFields(['email', ''])
                this.formRef.current.resetFields(['research', ''])
                this.formRef.current.resetFields(['introduction', ''])
                this.formRef.current.resetFields(['honor', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>教师</Title>
                <List
                    style={{background: 'white', marginTop: '20px'}}
                    size="large"
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item
                        actions={[<Button onClick={this.moveUp(item)} type={'link'} icon={<UpCircleOutlined/>}/>,
                            <Button onClick={this.moveDown(item)} type={'link'} icon={<DownCircleOutlined/>}/>,
                            <Link onClick={this.modifyItem(item)}>修改</Link>,
                            <Link onClick={this.deleteItem(item)}>删除</Link>]}>{item}</List.Item>}
                />
                <Button style={{marginTop: '20px'}} onClick={this.addItem}>
                    新增
                </Button>
                <Drawer
                    title={operate}
                    width={720}
                    onClose={this.onClose}
                    visible={visible}
                    bodyStyle={{paddingBottom: 80}}
                >
                    {i === '' ?
                        <Form ref={this.formRef} onFinish={this.handleOk}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline'}}>上传</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'姓名'} name={'name'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'邮箱'} name={'email'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'研究方向'} name={'research'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'个人简介'} name={'introduction'} rules={[{required: true, message: '请输入'}]}>
                                <Input.TextArea autoSize={true}/>
                            </Form.Item>
                            <Form.Item label={'荣誉奖励'} name={'honor'} help={'多个荣誉请以英文逗号\',\'分割'} rules={[{required: true, message: '请输入'}]}>
                                <Input.TextArea autoSize={true}/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right', marginRight: '50px'}} type="primary" htmlType="submit">
                                    {operate}
                                </Button>
                            </Form.Item>
                        </Form> :
                        <Form ref={this.formRef} onFinish={this.handleOk}
                              initialValues={{
                                  name: teachers[i].name,
                                  email: teachers[i].email,
                                  research: teachers[i].research,
                                  introduction: teachers[i].introduction,
                                  honor: teachers[i].honor
                              }}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <img className={index.img} src={teachers[i].img} alt={teachers[i].name}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'姓名'} name={'name'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'邮箱'} name={'email'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'研究方向'} name={'research'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'个人简介'} name={'introduction'} rules={[{required: true, message: '请输入'}]}>
                                <Input.TextArea autoSize={true}/>
                            </Form.Item>
                            <Form.Item label={'荣誉奖励'} name={'honor'} help={'多个荣誉请以英文逗号\',\'分割'} rules={[{required: true, message: '请输入'}]}>
                                <Input.TextArea autoSize={true}/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right', marginRight: '50px'}} type="primary" htmlType="submit">
                                    {operate}
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                </Drawer>
            </>
        )
    }
}

export default Teachers