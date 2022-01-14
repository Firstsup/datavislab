import React, {Component, Fragment} from 'react';
import index from './index.module.css'
import {Button, Card, Collapse, Divider, Spin} from "antd";
import Title from "antd/es/typography/Title";
import {FilePdfOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import getPaper from "../../../api/Achievements/getPaper";
import getPrize from "../../../api/Achievements/getPrize";
import getPatent from "../../../api/Achievements/getPatent";
import getImageUrl from "../../../api/Qiniu/getImageUrl";
import timeConversion from "../../../utils/TimeConversion";
import getFileUrl from "../../../api/Qiniu/getFileUrl";

const {Panel} = Collapse
const {Meta} = Card

let isUnmount = false

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: ['1'],
            showPaper: true,
            showPrize: false,
            showPatent: false,
            controller: new AbortController(),
            loading: true,
            papers: [],
            prizes: [],
            patents: []
        }
    }

    paperClick = () => {
        this.setState({
            showPaper: !this.state.showPaper
        })
    }

    prizeClick = () => {
        this.setState({
            showPrize: !this.state.showPrize
        })
    }

    patentClick = () => {
        this.setState({
            showPatent: !this.state.showPatent
        })
    }

    handleDownload = (i) => {
        return (() => {
                getFileUrl(this.state.papers[i].file, this.state.controller.signal).then(
                    result => {
                        if (result.code === 0) {
                            window.open(result.data.privateDownloadUrl, '_parent')
                        } else {
                            console.log(result.message)
                        }
                    }
                )
            }
        )
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getPaper(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                papers: result.data.papers
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            await getPrize(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                prizes: result.data.prizes
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            await getPatent(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                patents: result.data.patents
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.prizes.length; i++) {
                await getImageUrl(this.state.prizes[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.prizes]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            temp[i]['alt'] = `prize${i + 1}`
                            if (!isUnmount) {
                                this.setState({
                                    prizes: temp
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
        console.log(isUnmount)
        if (this.state.loading === true) {
            return (
                <div className={index.spin}>
                    <Spin size={"large"}/>
                </div>
            )
        } else {
            const {papers, prizes, patents} = this.state
            return (
                <div className={index.content}>
                    <div>
                        <div className={index.div}>
                            <Title level={2} style={{display: 'inline'}}>论文</Title>
                            {this.state.showPaper === true ?
                                <Button className={index.button} type={'dashed'} shape={'round'}
                                        icon={<VerticalAlignMiddleOutlined/>}
                                        onClick={this.paperClick}>折叠</Button> :
                                <Button className={index.button} type={'primary'} shape={'round'}
                                        icon={<VerticalAlignBottomOutlined/>}
                                        onClick={this.paperClick}>展开</Button>}
                            <Divider style={{border: "1px solid #595959", marginTop: '10px'}}/>
                        </div>
                        <Collapse ghost={true} collapsible={"header"} style={{marginTop: '-70px'}}
                                  activeKey={this.state.showPaper === true ? ['1'] : ['0']}>
                            <Panel showArrow={false} key={'1'} header={''}>
                                <div className={index.showTextDiv}>
                                    {papers.map((d, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <Paragraph className={index.paragraph}>
                                                    <blockquote>{d.title}<strong>（{d.venue}）</strong></blockquote>
                                                </Paragraph>
                                                <Button className={index.downloadButton} shape={'round'}
                                                        icon={<FilePdfOutlined/>}
                                                        onClick={this.handleDownload(i)}>预览</Button>
                                                <Divider/>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div>
                        <div className={index.div}>
                            <Title level={2} style={{display: 'inline'}}>奖项</Title>
                            {this.state.showPrize === true ?
                                <Button className={index.button} type={'dashed'} shape={'round'}
                                        icon={<VerticalAlignMiddleOutlined/>}
                                        onClick={this.prizeClick}>折叠</Button> :
                                <Button className={index.button} type={'primary'} shape={'round'}
                                        icon={<VerticalAlignBottomOutlined/>}
                                        onClick={this.prizeClick}>展开</Button>}
                            <Divider style={{border: "1px solid #595959", marginTop: '10px'}}/>
                        </div>
                        <Collapse ghost={true} collapsible={"header"} style={{marginTop: '-70px'}}
                                  activeKey={this.state.showPrize === true ? ['1'] : ['0']}>
                            <Panel showArrow={false} key={'1'} header={''}>
                                <div className={index.showDiv}
                                     style={{height: `${Math.ceil(prizes.length / 3) * 260}px`}}>
                                    {prizes.map((d, i) => {
                                        return (
                                            <Card key={i} className={index.prizeCard} size={"small"} hoverable={true}
                                                  cover={<img className={index.prizeCardImg} src={d.img} alt={d.alt}/>}>
                                                <Meta title={d.title} description={timeConversion(d.date)}/>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div>
                        <div className={index.div}>
                            <Title level={2} style={{display: 'inline'}}>专利</Title>
                            {this.state.showPatent === true ?
                                <Button className={index.button} type={'dashed'} shape={'round'}
                                        icon={<VerticalAlignMiddleOutlined/>}
                                        onClick={this.patentClick}>折叠</Button> :
                                <Button className={index.button} type={'primary'} shape={'round'}
                                        icon={<VerticalAlignBottomOutlined/>}
                                        onClick={this.patentClick}>展开</Button>}
                            <Divider style={{border: "1px solid #595959", marginTop: '10px'}}/>
                        </div>
                        <Collapse ghost={true} collapsible={"header"} style={{marginTop: '-70px'}}
                                  activeKey={this.state.showPatent === true ? ['1'] : ['0']}>
                            <Panel showArrow={false} key={'1'} header={''}>
                                <div className={index.showTextDiv}>
                                    {patents.map((d, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <Paragraph className={index.paragraph}>
                                                    <blockquote>[{d.number}]&emsp;{d.title}<span
                                                        style={{float: 'right'}}>{timeConversion(d.date)}</span>
                                                    </blockquote>
                                                </Paragraph>
                                                <Divider/>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            )
        }
    }
}

export default Achievements