import React, {FC, useEffect, useState} from 'react';
import cl from "./style.module.css"
import {Button, type GetProp, message, Space, Upload, UploadProps} from "antd";
import type {UploadFile} from "antd";
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import {MinusSquareOutlined, PlusOutlined} from "@ant-design/icons";
import AllTextEditor from "../AdminPanel/AllTextEditor";


// function removeItemAll(arr: [], value: any) {
//     let i = 0;
//     while (i < arr.length) {
//         if (arr[i] === value) {
//             arr.splice(i, 1);
//         } else {
//             ++i;
//         }
//     }
//     return arr;
// }
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getImageDataByName = (name: string) => {
    if (name === "null") return undefined;
    const t: UploadFile[] = [{
        uid: `id_${name}`,
        name: name,
        status: 'done',
        url: `${ApiUrl}/${name}`,
        thumbUrl: `${ApiUrl}/${name}`,
    }]
    return t
}

interface TextEditorComponentProps {
    initialContent?: string[];
    getData?: (arr: string[]) => void;
    onEdit?: () => void;
}

const ModifiedTextEditorComponent: FC<TextEditorComponentProps> = ({initialContent, getData, onEdit}) => {
    const [contents, setContents] = useState<string[]>(initialContent ? initialContent : ["htmlText <span></span>"]);
    const [data, setData] = useState<string[]>(initialContent ? initialContent : ["htmlText <span></span>"]);

    useEffect(() => {
        getData?.(data);
    }, [data, getData]);

    const addImage = () => {
        let newArray = JSON.parse(JSON.stringify(data))
        const a = [...newArray, "image null", "htmlText <span></span>"]
        if (onEdit) onEdit();
        setData(a);
        setContents(a);
        // console.log("addImage", [...newArray, "image null", "htmlText <span></span>"])
    }
    const removeImage = (ind: number) => {
        let newArray = JSON.parse(JSON.stringify(data))
        const a = [...newArray.slice(0, ind), ...newArray.slice(ind + 2)]
        if (onEdit) onEdit();
        setContents(a);
        setData(a);
        // console.log("removeImage" + data)
    };
    const ChangeHtml = (val: string, ind: number) => {
        let newArray = JSON.parse(JSON.stringify(data))
        if (onEdit) onEdit();
        newArray[ind] = `htmlText ${val}`;
        setData(newArray);
        // SetContents(newArray);
    }

    const props: UploadProps = {
        name: 'file',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true,
        beforeUpload: (file: FileType) => {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpeg';
            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png, jpg file`).then();
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        action: `${ApiUrl}/api/image/`,
        maxCount: 1,
        listType: "picture-card",
        onRemove: (file) => {
            ImageApi.deleteImage(file).then(() => {
                let newArray = JSON.parse(JSON.stringify(data))
                newArray.forEach((item: string, index: number) => {
                    if (item.endsWith(file.response)) {
                        newArray[index] = "image null";
                    }
                })
                if (onEdit) onEdit();
                setData(newArray);
                setContents(newArray);
            })
        },
    };
    const ImageChangingHandler = (info: any, i: number) => {
        if (info.file.status === 'done') {
            let newArray = JSON.parse(JSON.stringify(data))
            newArray[i] = `image ${info.file.response}`;
            if (onEdit) onEdit();
            setData(newArray);
            setContents(newArray);
            message.success(`${info.file.name} файл загружен успешно`).then();

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} файл не загрузился.`).then();
        }
    }
    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Загрузить</div>
        </button>
    );
    return (
        <div className={cl.main}>
            {contents.map((content, index) => {
                const contentSplit = content.split(" ");
                if (contentSplit[0] === "htmlText") return <AllTextEditor
                    defaultValue={content.slice(9)}
                    onChangeHTMLText={(value: string) => ChangeHtml(value, index)} key={index}/>

                return <Space key={index} className={cl.span}><Upload {...props} key={index}
                                                                      defaultFileList={getImageDataByName(contentSplit[1])}
                                                                      onChange={(info) => ImageChangingHandler(info, index)}
                                                                      className={cl.upload}>
                    {data[index] === "image null" ? uploadButton : null}
                </Upload>
                    <Button icon={<MinusSquareOutlined/>} onClick={() => removeImage(index)}></Button>
                </Space>
            })}
            <Button icon={<PlusOutlined/>} onClick={addImage}>Добавить новое фото</Button>

        </div>
    );
};

export default ModifiedTextEditorComponent;