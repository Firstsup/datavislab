import React, {Component} from 'react';
import Title from "antd/es/typography/Title";
import index from './index.module.css';
import {Button, Spin, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import getCarouselImageName from "../../../../api/About/getCarouselImageName";
import getImageUrl from "../../../../api/Qiniu/getImageUrl";
import getImageToken from "../../../../api/Qiniu/getImageToken";
import setCarouselImage from "../../../../api/About/setCarouselImage";
import {v4 as uuidv4} from 'uuid'
import ImgCrop from "antd-img-crop";

let isUnmount = false

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller: new AbortController(),
            loading: true,
            photosName: [],
            photos: [],
            fileList: [],
            uploadToken: '',
            fileName: '',
            selected: null
        }
    }

    indexChangeImg = (i) => {
        return (() => {
            if (!isUnmount) {
                this.setState({
                    selected: i + 1
                })
            }
        })
    }

    changeUpload = async (info) => {
        if (info.file.status === 'done') {
            try {
                await setCarouselImage(this.state.selected, this.state.fileName, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code !== 0) {
                            console.log(result.message)
                        }
                    }
                )
                message.destroy('loading')
                message.success(`${info.file.name}上传成功`)
                await getImageUrl(this.state.fileName, this.state.controller.signal, 2).then(
                    result => {
                        if (result.code === 0) {
                            const temp = this.state.photos
                            temp[this.state.selected - 1].img = result.data.privateDownloadUrl
                            if (!isUnmount) {
                                this.setState({
                                    photos: temp
                                })
                            }
                        } else {
                            console.log(result.message)
                        }
                    }
                )
            } catch (e) {
                console.log('e:', e)
            }
        } else if (info.file.status === 'error') {
            message.destroy('loading')
            message.error(`${info.file.name}上传失败`);
        }
    }

    setFile = async (file) => {
        message.loading({
            content: `${file.name}上传中……`,
            key: 'loading',
            duration: 0
        })
        const fileName = uuidv4()
        if (!isUnmount) {
            await this.setState({
                fileList: [file],
                fileName: fileName
            })
        }
        try {
            await getImageToken(this.state.fileName, this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                uploadToken: result.data.uploadToken
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )
        } catch (e) {
            console.log('e:', e)
        }
    }

    async componentDidMount() {
        isUnmount = false
        try {
            await getCarouselImageName(this.state.controller.signal, 2).then(
                result => {
                    if (result.code === 0) {
                        if (!isUnmount) {
                            this.setState({
                                photosName: result.data.name
                            })
                        }
                    } else {
                        console.log(result.message)
                    }
                }
            )

            for (let i = 0; i < this.state.photosName.length; i++) {
                await getImageUrl(this.state.photosName[i], this.state.controller.signal, 2).then(
                    // eslint-disable-next-line no-loop-func
                    result => {
                        if (result.code === 0) {
                            if (!isUnmount) {
                                this.setState({
                                    photos: [...this.state.photos, {
                                        img: result.data.privateDownloadUrl,
                                        alt: `carouselImage${i + 1}`
                                    }]
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
        if (this.state.loading === true) {
            return (
                <div className={index.spin}>
                    <Spin size={"large"}/>
                </div>
            )
        } else {
            const {photos} = this.state
            const data = {
                token: this.state.uploadToken,
                key: this.state.fileName
            }
            return (
                <div>
                    <Title level={3}>走马灯</Title>
                    {photos.map((d, i) => {
                        return (
                            <div key={i} className={index.indexImgDiv}>
                                <img src={d.img} alt={d.alt} className={index.indexCarouselImg}/>
                                <ImgCrop aspect={420 / 183} quality={1}>
                                    <Upload
                                        beforeUpload={
                                            file => this.setFile(file)
                                        }
                                        showUploadList={false}
                                        action={'http://up-z2.qiniup.com'}
                                        data={data}
                                        fileList={this.state.fileList}
                                        onChange={this.changeUpload}>
                                        <Button icon={<UploadOutlined/>} onClick={this.indexChangeImg(i)}
                                                style={{display: 'inline', marginLeft: '30px'}}>替换</Button>
                                    </Upload>
                                </ImgCrop>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

export default Carousel