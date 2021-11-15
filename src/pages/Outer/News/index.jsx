import React, {Component} from 'react';
import index from "./index.module.css";
import {Card, Pagination} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

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
    {
        id: 4,
        date: '2021.11.11',
        title: '新闻4',
        img: '/图片4.jfif',
        alt: '图片4'
    }
]

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    clickCard = (i) => {
        return (() => {
            this.props.history.push(`/newsdetail/${i}`)
        })
    }

    changePage = (page) => {
        this.setState({
            currentPage: page
        })
    }

    render() {
        return (
            <div className={index.div}>
                {news.map((d, i) => {
                    return (
                        <Card hoverable={true} key={i} className={index.card} onClick={this.clickCard(d.id)}>
                            <img className={index.cardImg} src={d.img} alt={d.name}/>
                            <Paragraph style={{marginTop: '16px'}}>{d.date}</Paragraph>
                            <Title level={5}>{d.title}</Title>
                        </Card>
                    )
                })}
                <Pagination className={index.pagination} onChange={this.changePage} defaultCurrent={1}
                            current={this.state.currentPage}
                            total={12}/>
            </div>
        )
    }
}

export default News