import React, {Component} from 'react';
import index from "./index.module.css";
import {Card, Pagination, Spin} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import getNewsCount from "../../../api/News/getNewsCount";
import getImageUrl from "../../../api/Qiniu/getImageUrl";
import timeConversion from "../../../utils/TimeConversion";
import getNewsList from "../../../api/News/getNewsList";

let isUnmount = false

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.location.search.substring(6),
            newsCount: 0,
            news: [],
            controller: new AbortController(),
            loading: true
        }
    }

    clickCard = (i) => {
        return (() => {
            this.props.history.push(`/newsdetail/${i}`)
        })
    }

    changePage = (page) => {
        this.props.history.push(`/news?page=${page}`)
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getNewsCount(this.state.controller.signal).then(
                result => {
                    if (!isUnmount) {
                        this.setState({
                            newsCount: result.data.count
                        })
                    }
                }
            )

            await getNewsList(this.state.currentPage, this.state.controller.signal).then(
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

            for (let i = 0; i < this.state.news.length; i++) {
                await getImageUrl(this.state.news[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.news]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            temp[i]['alt'] = `newsImg${i + 1}`
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
        if (!isUnmount) {
            this.setState({
                loading: false
            })
        }
    }

    async UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        isUnmount = false
        if (!isUnmount) {
            await this.setState({
                loading: true,
                currentPage: nextProps.location.search.substring(6)
            })
        }

        try {
            await getNewsList(this.state.currentPage, this.state.controller.signal).then(
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

            for (let i = 0; i < this.state.news.length; i++) {
                await getImageUrl(this.state.news[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.news]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            temp[i]['alt'] = `newsImg${i + 1}`
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
            const {currentPage, newsCount, news} = this.state
            return (
                <div className={index.div}>
                    {news.map((d, i) => {
                        return (
                            <Card hoverable={true} key={i} className={index.card} onClick={this.clickCard(d.id)}>
                                <img className={index.cardImg} src={d.img} alt={d.name}/>
                                <Paragraph style={{marginTop: '16px'}}>{timeConversion(d.date)}</Paragraph>
                                <Title level={5}>{d.title}</Title>
                            </Card>
                        )
                    })}
                    <Pagination className={index.pagination} onChange={this.changePage}
                                current={Number(currentPage)}
                                total={newsCount}/>
                </div>
            )
        }
    }
}

export default News