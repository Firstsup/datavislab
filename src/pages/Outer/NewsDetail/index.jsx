import React, {Component} from 'react';
import {Button, Card, Divider, Spin, Typography} from "antd";
import {LeftCircleOutlined} from '@ant-design/icons';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import getNewsDetail from "../../../api/News/getNewsDetail";
import getImageUrl from "../../../api/Qiniu/getImageUrl";
import timeConversion from "../../../utils/TimeConversion";
import getPreviousAndNextNews from "../../../api/News/getPreviousAndNextNews";
import Text from "antd/es/typography/Text";

const {Link} = Typography

let isUnmount = false

class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            controller: new AbortController(),
            loading: true,
            previous: {},
            next: {}
        }
    }

    handleBackButtonClick = () => {
        this.props.history.push('/news?page=1')
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getNewsDetail(this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1), this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                news: result.data.news[0]
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.news.content.length; i++) {
                if (this.state.news.content[i].startsWith('$image$')) {
                    await getImageUrl(this.state.news.content[i].substring(7), this.state.controller.signal, 1).then(
                        // eslint-disable-next-line no-loop-func
                        result => {
                            if (result.code === 0) {
                                let temp = this.state.news
                                temp.content[i] = `$image$${result.data.privateDownloadUrl}`
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

            await getPreviousAndNextNews(this.state.news.id, this.state.controller.signal, 1).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                previous: result.data.previous,
                                next: result.data.next
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
            const {news, previous, next} = this.state
            return (
                <>
                    <Card className={index.card}>
                        <Title className={index.title} level={2}>{news.title}</Title>
                        <Paragraph className={index.date}>{timeConversion(news.date)}</Paragraph>
                        <Divider/>
                        {news.content.map((d, i) => {
                            if (d.startsWith('$image$')) {
                                console.log(d.substring(7))
                                return (
                                    <img className={index.img} key={i} src={d.substring(7)} alt={`newsimage${i}`}/>
                                )
                            } else {
                                return (
                                    <p key={i} className={index.content}>{d}</p>
                                )
                            }
                        })}
                        <Divider/>
                        {previous.id === -1 ? <Text disabled>已经是第一篇了</Text> :
                            <div className={index.linkDiv}><Link
                                href={`/newsdetail/${previous.id}`}>上一篇：{previous.title}</Link>
                            </div>}
                        {next.id === -1 ? <Text disabled>已经是最后一篇了</Text> :
                            <div className={index.linkDiv}><Link
                                href={`/newsdetail/${next.id}`}>下一篇：{next.title}</Link>
                            </div>}
                        <Button className={index.backButton} onClick={this.handleBackButtonClick} type={'primary'}
                                icon={<LeftCircleOutlined/>}>资讯列表</Button>
                    </Card>
                </>
            )
        }
    }
}

export default NewsDetail