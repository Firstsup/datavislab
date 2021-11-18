import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import {Button, Drawer, Form, Input, List, message, Typography} from "antd";
import {DownCircleOutlined, UpCircleOutlined} from "@ant-design/icons";

const {Link} = Typography;

const paper = [
    {
        title: '就我个人来说，奖对我的意义，不能不说非常重大。 问题的关键究竟为何? 卡耐基在不经意间这样说过，一个不注意小事情的人，永远不会成就大事业。这启发了我， 在这种困难的抉择下，本人思来想去，寝食难安。 经过上述讨论总结的来说， 奖，到底应该如何实现。 了解清楚奖到底是一种怎么样的存在，是解决一切问题的关键。 既然如此， 一般来说， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 经过上述讨论这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 经过上述讨论那么， 既然如此。',
        venue: '我是venue'
    },
    {
        title: '123123',
        venue: '我是第二个venue'
    }
]
const data = paper.map((d) => {
    return d.title
})

class Paper extends Component {
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
                    this.formRef.current.resetFields(['title', paper[this.state.i].title])
                    this.formRef.current.resetFields(['venue', paper[this.state.i].title])
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
                this.formRef.current.resetFields(['title', ''])
                this.formRef.current.resetFields(['venue', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>论文</Title>
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
                            <Form.Item label={'题目'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'期刊会议'} name={'venue'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right', marginRight: '50px'}} type="primary" htmlType="submit">
                                    {operate}
                                </Button>
                            </Form.Item>
                        </Form> :
                        <Form ref={this.formRef} onFinish={this.handleOk}
                              initialValues={{
                                  title: paper[i].title,
                                  venue: paper[i].venue,
                              }}>
                            <Form.Item label={'题目'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'期刊会议'} name={'venue'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
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

export default Paper