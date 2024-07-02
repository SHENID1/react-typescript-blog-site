import React, {FC, useState} from 'react';
import {TextEditor} from "../TextEditor";
import cl from "./style.module.css"
import {Button, type GetProp, message, Space, Upload, UploadProps} from "antd";
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import {MinusSquareOutlined, UploadOutlined} from "@ant-design/icons";

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

interface TextEditorComponentProps {
    initialContent?: string[];
    getData?: () => string[];
}

const ModifiedTextEditorComponent: FC<TextEditorComponentProps> = ({initialContent}) => {
    const [contents, SetContents] = useState<string[]>(initialContent ? initialContent : ["htmlText <span></span>"]);

    const ChangeHtml = (c: string, index: number) => {
        console.log(contents );

        contents[index] = "htmlText " + c;
        SetContents(contents)
    }
    const addImage = () => SetContents([...contents, "image "]);
    const removeImage = (ind: number) => {
        console.log(contents)
        SetContents([...contents.slice(0, ind), ...contents.slice(ind + 1)]);
    };

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
        onChange: (info: any) => {
            if (info.file.status === 'done') {

                message.success(`${info.file.name} файл загружен успешно`).then();
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл не загрузился.`).then();
            }
        },
        maxCount: 1,
        listType: "picture",
        onRemove: ImageApi.deleteImage,
    };
    return (
        <div className={cl.main}>
            {contents.map((content, index) => {
                const contentSplit = content.split(" ");
                if (contentSplit[0] === "htmlText") return <TextEditor htmlText={contentSplit[1]} key={index}
                                                                       onChangeHTMLText={(value) => ChangeHtml(value, index)}/>
                return <Space key={index}><Upload {...props} >
                    <Button icon={<UploadOutlined/>}>Загрузить</Button>
                </Upload>
                    <Button icon={<MinusSquareOutlined />} onClick={()=>removeImage(index)}></Button>
                </Space>
            })}
            <Button icon={<UploadOutlined/>} onClick={addImage}>Загрузить новое фото</Button>


        </div>
    );
};

export default ModifiedTextEditorComponent;