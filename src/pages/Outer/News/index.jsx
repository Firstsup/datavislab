import React, {Component} from 'react';
import index from "./index.module.css";
import {Card, Pagination} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

const news = [
    {
        id: 1,
        date: '2021.11.8',
        title: 'Joel单抽出了狼末',
        img: '/甘雨立绘.png',
        alt: '甘雨'
    },
    {
        id: 2,
        date: '2021.11.9',
        title: '甘雨回来了吗',
        img: '/可莉立绘.png',
        alt: '可莉'
    },
    {
        id: 3,
        date: '2021.11.10',
        title: '甘雨回来了',
        img: '/安柏立绘.jpeg',
        alt: '安柏'
    },
    {
        id: 4,
        date: '2021.11.11',
        title: '今天要购物',
        img: '/雷电将军立绘.png',
        alt: '雷电将军'
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