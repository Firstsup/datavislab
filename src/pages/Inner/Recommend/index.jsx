import React, {Component} from 'react';
import index from './index.module.css'
import Paragraph from "antd/es/typography/Paragraph";
import {Button, Card, Input, Pagination, Space, Typography} from "antd";
import {FilePdfOutlined} from "@ant-design/icons";

const {Link} = Typography;
const {Search} = Input;

const recommend = [
    {
        title: '链路预测最新方法',
        content: '大家来看看',
        person: '我是推荐者',
        date: '2021.11.14',
        url: '',
        documentUrl: '123456'
    },
    {
        title: 'VIS FOR AI',
        content: '看看',
        person: '我是第二个推荐者',
        date: '2021.11.14',
        url: 'https://ant.design/components/list-cn/',
        documentUrl: ''
    }
]

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    onSearch = () => {

    }

    changePage = (page) => {
        this.setState({
            currentPage: page
        })
    }

    handleDownload = () => {
        console.log('download')
    }

    render() {
        return (
            <div className={index.content}>
                <Space className={index.space} direction="vertical">
                    <Search className={index.search} placeholder="搜索" allowClear onSearch={this.onSearch}/>
                </Space>
                {recommend.map((d, i) => {
                    return (
                        <Card key={i} title={d.title}
                              extra={'推荐人：' + d.person + '\xa0\xa0\xa0\xa0\xa0\xa0' + d.date}
                              className={index.card}>
                            <Paragraph className={index.paragraph}>
                                <blockquote>
                                    {d.content}
                                </blockquote>
                            </Paragraph>
                            {d.url === '' ?
                                <Button className={index.download} shape={'round'}
                                        icon={<FilePdfOutlined/>}
                                        onClick={this.handleDownload}>下载
                                </Button> :
                                <Link className={index.download} href={d.url}>
                                    {d.url}
                                </Link>}
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

export default Recommend