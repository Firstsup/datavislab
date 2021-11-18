import React, {Component} from 'react';
import index from './index.module.css'
import {Button, DatePicker, Drawer, Form, Input, List, message, Typography, Upload} from "antd";
import Title from "antd/es/typography/Title";
import {DownCircleOutlined, UpCircleOutlined, UploadOutlined} from "@ant-design/icons";
import moment from "moment";

const {Link} = Typography;

const news = [
    {
        date: '2021.11.8',
        title: '新闻1',
        content: ['池田大作在不经意间这样说过，不要回避苦恼和困难，挺起身来向它挑战，进而克服它。带着这句话，我们还要更加慎重的审视这个问题： 就我个人来说，吃饭对我的意义，不能不说非常重大。 总结的来说， 吃饭，到底应该如何实现。 要想清楚，吃饭，到底是一种怎么样的存在。 裴斯泰洛齐在不经意间这样说过，今天应做的事没有做，明天再早也是耽误了。这启发了我， 经过上述讨论塞涅卡在不经意间这样说过，生命如同寓言，其价值不在与长短，而在与内容。我希望诸位也能好好地体会这句话。 一般来讲，我们都必须务必慎重的考虑考虑。 问题的关键究竟为何? 富勒曾经说过，苦难磨炼一些人，也毁灭另一些人。这不禁令我深思。 在这种困难的抉择下，本人思来想去，寝食难安。 经过上述讨论带着这些问题，我们来审视一下吃饭。 吃饭，发生了会如何，不发生又会如何。 吃饭因何而发生?总结的来说， 我们都知道，只要有意义，那么就必须慎重考虑。',
            '现在，解决吃饭的问题，是非常非常重要的。 所以， 培根曾经说过，要知道对好事的称颂过于夸大，也会招来人们的反感轻蔑和嫉妒。这句话语虽然很短，但令我浮想联翩。 吕凯特在不经意间这样说过，生命不可能有两次，但许多人连一次也不善于度过。这句话语虽然很短，但令我浮想联翩。 既然如此， 而这些并不是完全重要，更加重要的问题是， 乌申斯基曾经说过，学习是劳动，是充满思想的劳动。这句话语虽然很短，但令我浮想联翩。 要想清楚，吃饭，到底是一种怎么样的存在。 一般来说， 生活中，若吃饭出现了，我们就不得不考虑它出现了的事实。 我认为， 富勒在不经意间这样说过，苦难磨炼一些人，也毁灭另一些人。这不禁令我深思。 现在，解决吃饭的问题，是非常非常重要的。 所以， 现在，解决吃饭的问题，是非常非常重要的。 所以， 了解清楚吃饭到底是一种怎么样的存在，是解决一切问题的关键。 非洲曾经说过，最灵繁的人也看不见自己的背脊。我希望诸位也能好好地体会这句话。 那么， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 所谓吃饭，关键是吃饭需要如何写。 经过上述讨论我们不得不面对一个非常尴尬的事实，那就是， 吃饭因何而发生?莎士比亚曾经说过，意志命运往往背道而驰，决心到最后会全部推倒。带着这句话，我们还要更加慎重的审视这个问题： 那么， 既然如何， 我们都知道，只要有意义，那么就必须慎重考虑。 吃饭，发生了会如何，不发生又会如何。 问题的关键究竟为何? 在这种困难的抉择下，本人思来想去，寝食难安。 了解清楚吃饭到底是一种怎么样的存在，是解决一切问题的关键。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 就我个人来说，吃饭对我的意义，不能不说非常重大。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 所谓吃饭，关键是吃饭需要如何写。 布尔沃在不经意间这样说过，要掌握书，莫被书掌握；要为生而读，莫为读而生。这不禁令我深思。 卡耐基在不经意间这样说过，我们若已接受最坏的，就再没有什么损失。这不禁令我深思。 生活中，若吃饭出现了，我们就不得不考虑它出现了的事实。 我们不得不面对一个非常尴尬的事实，那就是， 吃饭，发生了会如何，不发生又会如何。 经过上述讨论每个人都不得不面对这些问题。 在面对这种问题时， 要想清楚，吃饭，到底是一种怎么样的存在。 问题的关键究竟为何? 我们都知道，只要有意义，那么就必须慎重考虑。 了解清楚吃饭到底是一种怎么样的存在，是解决一切问题的关键。 吃饭，发生了会如何，不发生又会如何。'],
        img: '/图片1.jfif',
        alt: '图片1'
    },
    {
        date: '2021.11.9',
        title: '新闻2',
        content: ['我认为， 喝水，到底应该如何实现。 了解清楚喝水到底是一种怎么样的存在，是解决一切问题的关键。 我们都知道，只要有意义，那么就必须慎重考虑。 喝水的发生，到底需要如何做到，不喝水的发生，又会如何产生。 我们都知道，只要有意义，那么就必须慎重考虑。 爱尔兰曾经说过，越是无能的人，越喜欢挑剔别人的错儿。我希望诸位也能好好地体会这句话。 在这种困难的抉择下，本人思来想去，寝食难安。 喝水的发生，到底需要如何做到，不喝水的发生，又会如何产生。 一般来讲，我们都必须务必慎重的考虑考虑。 问题的关键究竟为何? 现在，解决喝水的问题，是非常非常重要的。 所以， 喝水，到底应该如何实现。 奥普拉·温弗瑞在不经意间这样说过，你相信什么，你就成为什么样的人。带着这句话，我们还要更加慎重的审视这个问题： 带着这些问题，我们来审视一下喝水。 一般来讲，我们都必须务必慎重的考虑考虑。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 喝水，到底应该如何实现。 了解清楚喝水到底是一种怎么样的存在，是解决一切问题的关键。 爱迪生在不经意间这样说过，失败也是我需要的，它和成功对我一样有价值。这不禁令我深思。 总结的来说， 孔子曾经说过，知之者不如好之者，好之者不如乐之者。带着这句话，我们还要更加慎重的审视这个问题： 生活中，若喝水出现了，我们就不得不考虑它出现了的事实。 生活中，若喝水出现了，我们就不得不考虑它出现了的事实。 所谓喝水，关键是喝水需要如何写。 罗素·贝克曾经说过，一个人即使已登上顶峰，也仍要自强不息。带着这句话，我们还要更加慎重的审视这个问题： 我们都知道，只要有意义，那么就必须慎重考虑。 富兰克林在不经意间这样说过，读书是易事，思索是难事，但两者缺一，便全无用处。我希望诸位也能好好地体会这句话。 既然如此， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 非洲在不经意间这样说过，最灵繁的人也看不见自己的背脊。带着这句话，我们还要更加慎重的审视这个问题。',
            '那么， 一般来讲，我们都必须务必慎重的考虑考虑。 俾斯麦曾经说过，对于不屈不挠的人来说，没有失败这回事。这启发了我， 所谓喝水，关键是喝水需要如何写。 莎士比亚在不经意间这样说过，意志命运往往背道而驰，决心到最后会全部推倒。这句话语虽然很短，但令我浮想联翩。 在这种困难的抉择下，本人思来想去，寝食难安。 在这种困难的抉择下，本人思来想去，寝食难安。 喝水，发生了会如何，不发生又会如何。 经过上述讨论就我个人来说，喝水对我的意义，不能不说非常重大。 生活中，若喝水出现了，我们就不得不考虑它出现了的事实。 喝水的发生，到底需要如何做到，不喝水的发生，又会如何产生。 而这些并不是完全重要，更加重要的问题是， 带着这些问题，我们来审视一下喝水。 我认为， 带着这些问题，我们来审视一下喝水。 喝水的发生，到底需要如何做到，不喝水的发生，又会如何产生。 所谓喝水，关键是喝水需要如何写。 问题的关键究竟为何? 我认为， 莎士比亚曾经说过，人的一生是短的，但如果卑劣地过这一生，就太长了。这启发了我， 爱迪生曾经说过，失败也是我需要的，它和成功对我一样有价值。这不禁令我深思。 每个人都不得不面对这些问题。 在面对这种问题时， 生活中，若喝水出现了，我们就不得不考虑它出现了的事实。 要想清楚，喝水，到底是一种怎么样的存在。 经过上述讨论那么， 生活中，若喝水出现了，我们就不得不考虑它出现了的事实。 我们不得不面对一个非常尴尬的事实，那就是， 我们不得不面对一个非常尴尬的事实，那就是， 而这些并不是完全重要，更加重要的问题是， 我们不得不面对一个非常尴尬的事实，那就是， 郭沫若曾经说过，形成天才的决定因素应该是勤奋。这不禁令我深思。 总结的来说， 既然如何， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 所谓喝水，关键是喝水需要如何写。 喝水因何而发生?既然如何， 一般来说， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 那么。'],
        img: '/图片2.jfif',
        alt: '图片2'
    },
    {
        date: '2021.11.10',
        title: '新闻3',
        content: ['莎士比亚在不经意间这样说过，意志命运往往背道而驰，决心到最后会全部推倒。这不禁令我深思。 歌德曾经说过，读一本好书，就如同和一个高尚的人在交谈。这句话语虽然很短，但令我浮想联翩。 歌德在不经意间这样说过，读一本好书，就如同和一个高尚的人在交谈。带着这句话，我们还要更加慎重的审视这个问题： 马克思曾经说过，一切节省，归根到底都归结为时间的节省。我希望诸位也能好好地体会这句话。 要想清楚，学习，到底是一种怎么样的存在。 总结的来说， 查尔斯·史考伯在不经意间这样说过，一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我， 一般来讲，我们都必须务必慎重的考虑考虑。 学习因何而发生?学习，发生了会如何，不发生又会如何。 学习的发生，到底需要如何做到，不学习的发生，又会如何产生。 要想清楚，学习，到底是一种怎么样的存在。 富勒在不经意间这样说过，苦难磨炼一些人，也毁灭另一些人。我希望诸位也能好好地体会这句话。 现在，解决学习的问题，是非常非常重要的。 所以， 罗曼·罗兰曾经说过，只有把抱怨环境的心情，化为上进的力量，才是成功的保证。这启发了我， 学习，发生了会如何，不发生又会如何。 一般来讲，我们都必须务必慎重的考虑考虑。 我们都知道，只要有意义，那么就必须慎重考虑。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来讲，我们都必须务必慎重的考虑考虑。 带着这些问题，我们来审视一下学习。 问题的关键究竟为何? 达·芬奇曾经说过，大胆和坚定的决心能够抵得上武器的精良。这句话语虽然很短，但令我浮想联翩。 歌德在不经意间这样说过，意志坚强的人能把世界放在手中像泥块一样任意揉捏。这启发了我， 了解清楚学习到底是一种怎么样的存在，是解决一切问题的关键。 一般来说， 每个人都不得不面对这些问题。 在面对这种问题时， 就我个人来说，学习对我的意义，不能不说非常重大。 俾斯麦曾经说过，失败是坚忍的最后考验。这启发了我， 带着这些问题，我们来审视一下学习。 那么， 经过上述讨论学习因何而发生?笛卡儿曾经说过，我的努力求学没有得到别的好处，只不过是愈来愈发觉自己的无知。这句话语虽然很短，但令我浮想联翩。 那么。',
            '学习的发生，到底需要如何做到，不学习的发生，又会如何产生。 学习的发生，到底需要如何做到，不学习的发生，又会如何产生。 俾斯麦曾经说过，对于不屈不挠的人来说，没有失败这回事。我希望诸位也能好好地体会这句话。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 经过上述讨论带着这些问题，我们来审视一下学习。 我们都知道，只要有意义，那么就必须慎重考虑。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 而这些并不是完全重要，更加重要的问题是， 总结的来说， 了解清楚学习到底是一种怎么样的存在，是解决一切问题的关键。 现在，解决学习的问题，是非常非常重要的。 所以， 学习因何而发生?学习的发生，到底需要如何做到，不学习的发生，又会如何产生。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 我们不得不面对一个非常尴尬的事实，那就是， 生活中，若学习出现了，我们就不得不考虑它出现了的事实。 既然如此， 现在，解决学习的问题，是非常非常重要的。 所以， 一般来讲，我们都必须务必慎重的考虑考虑。 所谓学习，关键是学习需要如何写。'],
        img: '/图片3.jfif',
        alt: '图片3'
    },
    {
        date: '2021.11.11',
        title: '新闻4',
        content: ['生活中，若睡觉出现了，我们就不得不考虑它出现了的事实。 现在，解决睡觉的问题，是非常非常重要的。 所以， 一般来说， 睡觉的发生，到底需要如何做到，不睡觉的发生，又会如何产生。 冯学峰曾经说过，当一个人用工作去迎接光明，光明很快就会来照耀着他。我希望诸位也能好好地体会这句话。 笛卡儿曾经说过，我的努力求学没有得到别的好处，只不过是愈来愈发觉自己的无知。带着这句话，我们还要更加慎重的审视这个问题： 既然如何， 睡觉的发生，到底需要如何做到，不睡觉的发生，又会如何产生。 睡觉的发生，到底需要如何做到，不睡觉的发生，又会如何产生。 经过上述讨论贝多芬曾经说过，卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。这句话语虽然很短，但令我浮想联翩。 睡觉，到底应该如何实现。 要想清楚，睡觉，到底是一种怎么样的存在。',
            '就我个人来说，睡觉对我的意义，不能不说非常重大。 在这种困难的抉择下，本人思来想去，寝食难安。 现在，解决睡觉的问题，是非常非常重要的。 所以， 我认为， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 要想清楚，睡觉，到底是一种怎么样的存在。 那么， 生活中，若睡觉出现了，我们就不得不考虑它出现了的事实。 培根在不经意间这样说过，合理安排时间，就等于节约时间。这启发了我， 既然如何， 要想清楚，睡觉，到底是一种怎么样的存在。 一般来说， 塞涅卡在不经意间这样说过，真正的人生，只有在经过艰难卓绝的斗争之后才能实现。我希望诸位也能好好地体会这句话。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 我们不得不面对一个非常尴尬的事实，那就是， 西班牙在不经意间这样说过，自己的鞋子，自己知道紧在哪里。这启发了我， 一般来说， 既然如此， 我们都知道，只要有意义，那么就必须慎重考虑。 睡觉，到底应该如何实现。 而这些并不是完全重要，更加重要的问题是， 了解清楚睡觉到底是一种怎么样的存在，是解决一切问题的关键。 每个人都不得不面对这些问题。 在面对这种问题时， 那么， 而这些并不是完全重要，更加重要的问题是， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 既然如何， 所谓睡觉，关键是睡觉需要如何写。 我们不得不面对一个非常尴尬的事实，那就是， 而这些并不是完全重要，更加重要的问题是， 我们不得不面对一个非常尴尬的事实，那就是， 总结的来说， 经过上述讨论既然如何， 睡觉的发生，到底需要如何做到，不睡觉的发生，又会如何产生。 睡觉，到底应该如何实现。 一般来讲，我们都必须务必慎重的考虑考虑。 问题的关键究竟为何? 经过上述讨论生活中，若睡觉出现了，我们就不得不考虑它出现了的事实。 总结的来说， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 现在，解决睡觉的问题，是非常非常重要的。 所以。'],
        img: '/图片4.jfif',
        alt: '图片4'
    }
]
const data = news.map((d) => {
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

class News extends Component {
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
                    this.formRef.current.resetFields(['title', news[this.state.i].title])
                    this.formRef.current.resetFields(['date', moment(news[this.state.i].date, 'YYYY/MM/DD')])
                    this.formRef.current.resetFields(['content', news[this.state.i].content])
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
                this.formRef.current.resetFields(['content', ''])
            }
        })
    }

    render() {
        const {visible, i, operate} = this.state
        return (
            <>
                <Title level={3}>新闻</Title>
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
                            <Form.Item label={'标题'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'日期'} name={'date'} rules={[{required: true, message: '请输入'}]}>
                                <DatePicker allowClear/>
                            </Form.Item>
                            <Form.Item label={'内容'} name={'content'} rules={[{required: true, message: '请输入'}]}>
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
                                  title: news[i].title,
                                  date: moment(news[i].date, 'YYYY/MM/DD'),
                                  content: news[i].content,
                              }}>
                            <Form.Item rules={[{required: true, message: '请上传'}]}>
                                <img className={index.img} src={news[i].img} alt={news[i].name}/>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}
                                            style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label={'标题'} name={'title'} rules={[{required: true, message: '请输入'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'日期'} name={'date'} rules={[{required: true, message: '请输入'}]}>
                                <DatePicker allowClear/>
                            </Form.Item>
                            <Form.Item label={'内容'} name={'content'} rules={[{required: true, message: '请输入'}]}>
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

export default News