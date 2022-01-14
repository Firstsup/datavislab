import React, {Component} from 'react';
import {Card, Carousel, Spin, Typography} from "antd";
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import getImageUrl from "../../../api/Qiniu/getImageUrl";
import getCarouselImageName from "../../../api/About/getCarouselImageName";
import getIntroduction from "../../../api/About/getIntroduction";
import getIndexNews from "../../../api/About/getIndexNews";
import timeConversion from "../../../utils/TimeConversion";

const {Meta} = Card

let isUnmount = false

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photosName: [],
            photos: [],
            introduction: [],
            news: [],
            controller: new AbortController(),
            loading: true
        }
    }

    clickCard = (i) => {
        return () => {
            this.props.history.push(`/newsdetail/${i}`)
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getCarouselImageName(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                photosName: result.data.name
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.photosName.length; i++) {
                await getImageUrl(this.state.photosName[i], this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            if (!isUnmount) {
                                this.setState({
                                    photos: [...this.state.photos, {
                                        img: result.data.privateDownloadUrl,
                                        alt: `carouselImage${i + 1}`
                                    }]
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
        try {
            await getIntroduction(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        const introduction = result.data.introduction.split('$segment$')
                        if (!isUnmount) {
                            this.setState({
                                introduction: introduction
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
        try {
            await getIndexNews(this.state.controller.signal).then(
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
            const {photos, introduction, news} = this.state
            return (
                <>
                    <Carousel autoplay className={index.carousel}>
                        {photos.map((d, i) => {
                            return (
                                <div key={i} className={index.imgDiv}>
                                    <img src={d.img} alt={d.alt} className={index.carouselImg}/>
                                </div>
                            )
                        })}
                    </Carousel>
                    <div>
                        <Title level={2} className={index.title} style={{marginBottom: '30px'}}>实验室简介</Title>
                        {introduction.map((d, i) => {
                            return (
                                <p key={i} className={index.paragraph}>{d}</p>
                            )
                        })}
                    </div>
                    <Typography>
                        <Title level={2} className={index.title} style={{marginTop: '80px'}}>新闻资讯</Title>
                    </Typography>
                    <div className={index.cardDiv}>
                        {news.map((d, i) => {
                            return (
                                <Card key={i} className={index.card} onClick={this.clickCard(d.id)}
                                      size={"small"}
                                      hoverable={true}
                                      cover={<img className={index.cardImg} src={d.img} alt={d.alt}/>}>
                                    <Meta title={d.title} description={timeConversion(d.date)}/>
                                </Card>
                            )
                        })}
                    </div>
                </>
            )
        }
    }
}

export default Index