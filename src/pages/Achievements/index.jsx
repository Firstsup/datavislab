import React, {Component} from 'react';
import index from './index.module.css'
import {Collapse} from "antd";

const {Panel} = Collapse;

const prize = [
    {
        img: '/甘雨立绘.png',
        alt: '甘雨',
        title: '最温柔奖',
        date: '2021.11.10'
    },
    {
        img: '/可莉立绘.png',
        alt: '可莉',
        title: '最可爱奖',
        date: '2021.11.11'
    }
]

const paper = [
    {
        title: '就我个人来说，奖对我的意义，不能不说非常重大。 问题的关键究竟为何? 卡耐基在不经意间这样说过，一个不注意小事情的人，永远不会成就大事业。这启发了我， 在这种困难的抉择下，本人思来想去，寝食难安。 经过上述讨论总结的来说， 奖，到底应该如何实现。 了解清楚奖到底是一种怎么样的存在，是解决一切问题的关键。 既然如此， 一般来说， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 经过上述讨论这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 经过上述讨论那么， 既然如此。',
        venue: '我是venue',
        date: '2021.11.10'
    },
    {
        title: '123123',
        venue: '我是第二个venue',
        date: '2021.11.11'
    }
]

const patent = [
    {
        number: '321321.123',
        title: '一种Genshin Impact选美比赛最终由甘雨获胜',
        date: '2021.11.10'
    },
    {
        number: '89076389743',
        title: '我是椰🐏',
        date: '2021.11.11'
    }
]

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: 1
        }
    }

    changeCollapse = () => {

    }

    render() {
        return (
            <>
                <Collapse activeKey={this.state.collapse} onChange={this.changeCollapse}>
                    <Panel header="This is panel header 1" key="1">
                        <p>123</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>456</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>789</p>
                    </Panel>
                </Collapse>
            </>
        )
    }
}

export default Achievements