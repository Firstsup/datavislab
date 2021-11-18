import React, {Component} from 'react';
import index from './index.module.css'
import {Button, DatePicker, Drawer, Form, Input, List, message, Typography, Upload} from "antd";
import moment from "moment";
import Title from "antd/es/typography/Title";
import {DownCircleOutlined, UpCircleOutlined, UploadOutlined} from "@ant-design/icons";

const {Link} = Typography;

const prize = [
    {
        img: '/图片1.jfif',
        alt: '图片1',
        title: '奖1',
        date: '2021.11.10'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2',
        title: '奖2',
        date: '2021.11.11'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2',
        title: '奖2',
        date: '2021.11.11'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2',
        title: '奖2',
        date: '2021.11.11'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2',
        title: '奖2',
        date: '2021.11.11'
    }
]
const data = prize.map((d) => {
    return d.title
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

class Prize extends Component {
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
                    this.formRef.current.resetFields(['title', prize[this.state.i].title])
                    this.formRef.current.resetFields(['date', moment(prize[this.state.i].date, 'YYYY/MM/DD')])
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
        console.log(value.date.format('YYYY/MM/DD'))
        console.log(value)
    }

    addItem = () => {
        this.setState({
            operate: '新增',
            visible: true
        }, () => {
            if (this.formRef.current !== null) {
                this.formRef.current.resetFields(['title', ''])
                this.formRef.current.resetFields(['date', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>奖项</Title>
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
                            <Form.Item label={'专利名'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'日期'} name={'date'} rules={[{required: true, message: '请输入'}]}>
                                <DatePicker allowClear/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right', marginRight: '50px'}} type="primary" htmlType="submit">
                                    {operate}
                                </Button>
                            </Form.Item>
                        </Form> :
                        <Form ref={this.formRef} onFinish={this.handleOk}
                              initialValues={{
                                  title: prize[i].title,
                                  date: moment(prize[i].date, 'YYYY/MM/DD')
                              }}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <img className={index.img} src={prize[i].img} alt={prize[i].name}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'专利名'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'日期'} name={'date'} rules={[{required: true, message: '请输入'}]}>
                                <DatePicker allowClear/>
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

export default Prize