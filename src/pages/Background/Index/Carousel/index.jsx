import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import index from './index.module.css';
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

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
const indexProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Carousel extends Component {
    indexChangeImg = (i) => {
        return (() => {
            console.log(i)
        })
    }

    render() {
        return (
            <div>
                <Title level={3}>走马灯</Title>
                {photos.map((d, i) => {
                    return (
                        <div key={i} className={index.indexImgDiv}>
                            <img src={d.img} alt={d.alt} className={index.indexCarouselImg}/>
                            <Upload {...indexProps}>
                                <Button icon={<UploadOutlined/>} onClick={this.indexChangeImg(i)}
                                        style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                            </Upload>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Carousel