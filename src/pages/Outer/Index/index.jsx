import React, {Component} from 'react';
import {Card, Carousel, Typography} from "antd";
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const {Meta} = Card

const photos = [
    {
        img: '/图片1.jfif',
        alt: '图片1'
    },
    {
        img: '/图片2.jfif',
        alt: '图片2'
    },
    {
        img: '/图片3.jfif',
        alt: '图片3'
    }
]
const introduction = '电子科技大学大数据可视分析实验室。读书有感：从前读书，一目十行，读完作罢，书云亦云，如需记忆，死记硬背便可。现在读书，知作者资料，了解作品创作背景，一字一词一句，仔细斟酌品味，多有自己所感所思所悟，作品主旨与自身所悟合一终为所学所获。妙哉，妙哉！发怒，是用别人的错误惩罚自己；烦恼，是用自己的过失折磨自己；后悔，是用无奈的往事摧残自己；忧虑，是用虚拟的风险惊吓自己；孤独，是用自制的牢房禁锢自己；自卑，是用别人的长处抵毁自己。摒弃这些，你就会轻松许多！'
const news = [
    {
        id: 1,
        date: '2021.11.8',
        title: '新闻1',
        img: '/图片1.jfif',
        alt: '图片1'
    },
    {
        id: 2,
        date: '2021.11.9',
        title: '新闻2',
        img: '/图片2.jfif',
        alt: '图片2'
    },
    {
        id: 3,
        date: '2021.11.10',
        title: '新闻3',
        img: '/图片3.jfif',
        alt: '图片3'
    },
]

class Index extends Component {
    clickCard = (i) => {
        return () => {
            this.props.history.push(`/newsdetail/${i}`)
        }
    }

    render() {
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
                <Typography>
                    <Title level={2} className={index.title}>实验室简介</Title>
                    <Paragraph className={index.paragraph}>{introduction}</Paragraph>
                </Typography>
                <Typography>
                    <Title level={2} className={index.title}>新闻资讯</Title>
                </Typography>
                <div className={index.cardDiv}>
                    {news.map((d, i) => {
                        return (
                            <Card key={i} className={index.card} onClick={this.clickCard(d.id)}
                                  size={"small"}
                                  hoverable={true}
                                  cover={<img className={index.cardImg} src={d.img} alt={d.alt}/>}>
                                <Meta title={d.title} description={d.date}/>
                            </Card>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Index