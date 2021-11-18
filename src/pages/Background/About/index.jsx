import React, {Component} from 'react';
import index from './index.module.css'
import Title from "antd/es/typography/Title";
import {Button, Form, Input} from "antd";

const labInformation = {
    ChineseName: '大数据可视分析实验室',
    EnglishName: 'Visual Analytic of Big Data Lab',
    phone: '123123123',
    email: '123123123@qq.com',
    address: '四川省 成都市 高新西区 西源大道2006号 电子科技大学清水河校区 创新中心B312',
    invitation: '欢迎有志之士前来'
}

class About extends Component {
    indexFinishForm = (value) => {
        console.log(value)
    }

    render() {
        return (
            <div>
                <Title level={3}>关于我们</Title>
                <Form style={{marginTop: '20px'}} initialValues={{
                    ChineseName: labInformation.ChineseName,
                    EnglishName: labInformation.EnglishName,
                    phone: labInformation.phone,
                    email: labInformation.email,
                    address: labInformation.address,
                    invitation: labInformation.invitation
                }}
                      onFinish={this.indexFinishForm}>
                    <Form.Item label={'中文名称'} name={'ChineseName'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'英文名称'} name={'EnglishName'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'联系电话'} name={'phone'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'联系邮箱'} name={'email'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'地址'} name={'address'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'致辞'} name={'invitation'}>
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

export default About