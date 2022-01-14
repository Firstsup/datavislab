import React, {Component} from 'react';
import index from './index.module.css'
import {Card, Spin} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import getDirection from "../../../api/Directions/getDirection";
import getImageUrl from "../../../api/Qiniu/getImageUrl";

let isUnmount = false

class Directions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            directions: []
        }
    }

    async componentDidMount() {
        isUnmount = false
        try{
            await getDirection(this.state.controller.signal).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                directions: result.data.directions
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.directions.length; i++) {
                await getImageUrl(this.state.directions[i].cover, this.state.controller.signal).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            let temp = [...this.state.directions]
                            temp[i]['img'] = result.data.privateDownloadUrl
                            temp[i]['alt'] = `direction${i + 1}`
                            if (!isUnmount) {
                                this.setState({
                                    directions: temp
                                })
                            }
                        } else {
                            console.log(result.message)
                        }
                    }
                )
            }
        }
        catch (e) {
            console.log('e:',e)
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
        }
        else{
            const {directions} = this.state
            return (
                <div className={index.div}>
                    {directions.map((d, i) => {
                        return (
                            <Card hoverable={true} key={i} className={index.card}>
                                <img className={index.cardImg} src={d.img} alt={d.name}/>
                                <Title level={5} style={{marginTop: '5px'}}>{d.name}</Title>
                                <Paragraph className={index.paragraph}>{d.introduction}</Paragraph>
                            </Card>
                        )
                    })}
                </div>
            )
        }
    }
}

export default Directions