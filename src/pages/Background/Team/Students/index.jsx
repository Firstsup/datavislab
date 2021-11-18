import React, {Component} from 'react';
import index from './index.module.css'
import {Button, Drawer, Form, Input, List, message, Typography, Upload} from "antd";
import Title from "antd/es/typography/Title";
import {DownCircleOutlined, UpCircleOutlined, UploadOutlined} from "@ant-design/icons";

const {Link} = Typography;

const students = [
    {
        img: '/图片2.jfif',
        graduate: '2020',
        name: '图片2',
        research: '方向2',
        email: '123123123@qq.com',
        introduction: '我是图片2'
    },
    {
        img: '/图片3.jfif',
        graduate: '2021',
        name: '图片3',
        research: '方向3',
        email: '123123123@qq.com',
        introduction: '我是图片3'
    },
    {
        img: '/图片4.jfif',
        graduate: '2022',
        name: '图片4',
        research: '方向4',
        email: '123123123@qq.com',
        introduction: '我是图片4'
    },
    {
        img: '/图片5.jfif',
        graduate: '2023',
        name: '图片5',
        research: '方向5',
        email: '123123123@qq.com',
        introduction: '我是图片5'
    }
]
const data = students.map((d) => {
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

class Students extends Component {
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
                    this.formRef.current.resetFields(['name', students[this.state.i].name])
                    this.formRef.current.resetFields(['email', students[this.state.i].email])
                    this.formRef.current.resetFields(['graduate', students[this.state.i].graduate])
                    this.formRef.current.resetFields(['research', students[this.state.i].research])
                    this.formRef.current.resetFields(['introduction', students[this.state.i].introduction])
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
    }

    addItem = () => {
        this.setState({
            operate: '新增',
            visible: true
        }, () => {
            if (this.formRef.current !== null) {
                this.formRef.current.resetFields(['name', ''])
                this.formRef.current.resetFields(['email', ''])
                this.formRef.current.resetFields(['graduate', ''])
                this.formRef.current.resetFields(['research', ''])
                this.formRef.current.resetFields(['introduction', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>学生</Title>
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
                            <Form.Item label={'邮箱'} name={'email'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'毕业年份'} name={'graduate'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'研究方向'} name={'research'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'个人简介'} name={'introduction'}>
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
                                  name: students[i].name,
                                  email: students[i].email,
                                  graduate: students[i].graduate,
                                  research: students[i].research,
                                  introduction: students[i].introduction
                              }}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <img className={index.img} src={students[i].img} alt={students[i].name}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'姓名'} name={'name'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'邮箱'} name={'email'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'毕业年份'} name={'graduate'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'研究方向'} name={'research'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'个人简介'} name={'introduction'}>
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

export default Students