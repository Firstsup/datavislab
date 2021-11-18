import React, {Component, Fragment} from 'react';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import {Button, Form, Input, message, Upload, List, Typography, Drawer} from "antd";
import {DownCircleOutlined, UpCircleOutlined, UploadOutlined} from "@ant-design/icons";

const {Link} = Typography;

let directions = [
    {
        img: '/图片1.jfif',
        alt: '图片1',
        name: '方向1',
        introduction: '方向1因何而发生?奥斯特洛夫斯基在不经意间这样说过，共同的事业，共同的斗争，可以使人们产生忍受一切的力量。　我希望诸位也能好好地体会这句话。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 问题的关键究竟为何? 斯宾诺莎在不经意间这样说过，最大的骄傲于最大的自卑都表示心灵的最软弱无力。这不禁令我深思。 一般来说， 一般来说， 黑格尔在不经意间这样说过，只有永远躺在泥坑里的人，才不会再掉进坑里。这不禁令我深思。 我们不得不面对一个非常尴尬的事实，那就是， 我们不得不面对一个非常尴尬的事实，那就是， 要想清楚，冰弓，到底是一种怎么样的存在。'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2',
        name: '方向2',
        introduction: '要想清楚，方向2，到底是一种怎么样的存在。 一般来讲，我们都必须务必慎重的考虑考虑。 所谓火法，关键是火法需要如何写。 而这些并不是完全重要，更加重要的问题是， 拉罗什福科在不经意间这样说过，我们唯一不会改正的缺点是软弱。带着这句话，我们还要更加慎重的审视这个问题： 而这些并不是完全重要，更加重要的问题是， 冯学峰曾经说过，当一个人用工作去迎接光明，光明很快就会来照耀着他。带着这句话，我们还要更加慎重的审视这个问题： 既然如何， 每个人都不得不面对这些问题。 在面对这种问题时， 我们都知道，只要有意义，那么就必须慎重考虑。 达·芬奇曾经说过，大胆和坚定的决心能够抵得上武器的精良。这启发了我， 而这些并不是完全重要，更加重要的问题是， 带着这些问题，我们来审视一下火法。 总结的来说， 经过上述讨论火法的发生，到底需要如何做到，不火法的发生，又会如何产生。 马尔顿在不经意间这样说过，坚强的信心，能使平凡的人做出惊人的事业。这句话语虽然很短，但令我浮想联翩。 在这种困难的抉择下，本人思来想去，寝食难安。 经过上述讨论而这些并不是完全重要，更加重要的问题是， 而这些并不是完全重要，更加重要的问题是， 火法，发生了会如何，不发生又会如何。 在这种困难的抉择下，本人思来想去，寝食难安。 火法的发生，到底需要如何做到，不火法的发生，又会如何产生。 卢梭在不经意间这样说过，浪费时间是一桩大罪过。带着这句话，我们还要更加慎重的审视这个问题： 维龙曾经说过，要成功不需要什么特别的才能，只要把你能做的小事做得好就行了。我希望诸位也能好好地体会这句话。 总结的来说， 克劳斯·莫瑟爵士曾经说过，教育需要花费钱，而无知也是一样。这不禁令我深思。 总结的来说， 一般来说， 火法因何而发生?既然如何， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 罗素·贝克在不经意间这样说过，一个人即使已登上顶峰，也仍要自强不息。这启发了我， 火法的发生，到底需要如何做到，不火法的发生，又会如何产生。 我认为， 火法，到底应该如何实现。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 要想清楚，火法，到底是一种怎么样的存在。 那么， 了解清楚火法到底是一种怎么样的存在，是解决一切问题的关键。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 生活中，若火法出现了，我们就不得不考虑它出现了的事实。 笛卡儿曾经说过，读一切好书，就是和许多高尚的人谈话。这启发了我， 要想清楚，火法，到底是一种怎么样的存在。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 卡耐基在不经意间这样说过，一个不注意小事情的人，永远不会成就大事业。带着这句话，我们还要更加慎重的审视这个问题： 我们不得不面对一个非常尴尬的事实，那就是， 既然如何， 卡莱尔在不经意间这样说过，过去一切时代的精华尽在书中。我希望诸位也能好好地体会这句话。 所谓火法，关键是火法需要如何写。 生活中，若火法出现了，我们就不得不考虑它出现了的事实。 生活中，若火法出现了，我们就不得不考虑它出现了的事实。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 既然如何， 带着这些问题，我们来审视一下火法。 现在，解决火法的问题，是非常非常重要的。 所以， 一般来说， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。'
    }
]
const data = directions.map((d) => {
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

class Directions extends Component {
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
                    this.formRef.current.resetFields(['name', directions[this.state.i].name])
                    this.formRef.current.resetFields(['introduction', directions[this.state.i].introduction])
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
        //fetch
    }

    addItem = () => {
        this.setState({
            operate: '新增',
            visible: true
        }, () => {
            if (this.formRef.current !== null) {
                this.formRef.current.resetFields(['name', ''])
                this.formRef.current.resetFields(['introduction', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>研究方向</Title>
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
                            <Form.Item label={'方向名称'} name={'name'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'方向简介'} name={'introduction'} rules={[{required: true, message: '请输入'}]}>
                                <Input.TextArea autoSize={true}/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right', marginRight: '50px'}} type="primary" htmlType="submit">
                                    {operate}
                                </Button>
                            </Form.Item>
                        </Form> :
                        <Form ref={this.formRef} onFinish={this.handleOk}
                              initialValues={{name: directions[i].name, introduction: directions[i].introduction}}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <img className={index.img} src={directions[i].img} alt={directions[i].name}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'方向名称'} name={'name'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'方向简介'} name={'introduction'} rules={[{required: true, message: '请输入'}]}>
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

export default Directions