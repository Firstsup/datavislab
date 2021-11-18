import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import {Button, Form, Input} from "antd";
import index from './index.module.css'

const introduction = '电子科技大学大数据可视分析实验室。读书有感：从前读书，一目十行，读完作罢，书云亦云，如需记忆，死记硬背便可。现在读书，知作者资料，了解作品创作背景，一字一词一句，仔细斟酌品味，多有自己所感所思所悟，作品主旨与自身所悟合一终为所学所获。妙哉，妙哉！发怒，是用别人的错误惩罚自己；烦恼，是用自己的过失折磨自己；后悔，是用无奈的往事摧残自己；忧虑，是用虚拟的风险惊吓自己；孤独，是用自制的牢房禁锢自己；自卑，是用别人的长处抵毁自己。摒弃这些，你就会轻松许多！'

class Introduction extends Component {
    indexFinishForm = (value) => {
        const arr = value.introduction.split('\n')
        console.log(arr)
    }

    render() {
        return (
            <div>
                <Title level={3}>实验室简介</Title>
                <Form style={{marginTop: '20px'}} initialValues={{introduction: introduction}}
                      onFinish={this.indexFinishForm}>
                    <Form.Item name={'introduction'}>
                        <Input.TextArea autoSize={true}/>
                    </Form.Item>
                    <Form.Item>
                        <Button className={index.button} type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Introduction