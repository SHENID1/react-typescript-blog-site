import React, {FC, useEffect, useState} from 'react';
import cl from "./style.module.css"
import {Button, type GetProp, message, Space, Upload, UploadProps} from "antd";
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import {MinusSquareOutlined, UploadOutlined} from "@ant-design/icons";
import AllTextEditor from "../AdminPanel/test";
// import draftToHtml from "draftjs-to-html";
// import {convertToRaw} from "draft-js";

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
    getData?: (arr: string[]) => void;
}

const ModifiedTextEditorComponent: FC<TextEditorComponentProps> = ({initialContent, getData}) => {
    const [contents, setContents] = useState<string[]>(["htmlText <span></span>"]);
    const [data, setData] = useState<string[]>(["htmlText <span></span>"]);

    useEffect(() => {
        getData?.(data);
    }, [data, getData]);

    const addImage = () => {
        let newArray = JSON.parse(JSON.stringify(data))
        const a = [...newArray, "image null", "htmlText <span></span>"]
        setData(a);
        setContents(a);
        // console.log("addImage", [...newArray, "image null", "htmlText <span></span>"])
    }
    const removeImage = (ind: number) => {
        let newArray = JSON.parse(JSON.stringify(data))
        const a = [...newArray.slice(0, ind), ...newArray.slice(ind + 2)]
        setContents(a);
        setData(a);
        // console.log("removeImage" + data)
    };
    const ChangeHtml = (val: string, ind: number) => {
        let newArray = JSON.parse(JSON.stringify(data))

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
        listType: "picture",
        onRemove: ImageApi.deleteImage,
    };
    const ImageChangingHandler = (info: any, i: number) => {
        if (info.file.status === 'done') {
            let newArray = JSON.parse(JSON.stringify(data))
            newArray[i] = `image ${info.file.response}`;
            setData(newArray);
            setContents(newArray);
            message.success(`${info.file.name} файл загружен успешно`).then();

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} файл не загрузился.`).then();
        }
    }
    return (
        <div className={cl.main}>
            {contents.map((content, index) => {
                const contentSplit = content.split(" ");
                if (contentSplit[0] === "htmlText") return <AllTextEditor
                    onChangeHTMLText={(value: string) => ChangeHtml(value, index)} key={index}/>

                return <Space key={index}><Upload {...props} key={index}
                                                  onChange={(info) => ImageChangingHandler(info, index)}>
                    <Button icon={<UploadOutlined/>}>Загрузить</Button>
                </Upload>
                    <Button icon={<MinusSquareOutlined/>} onClick={() => removeImage(index)}></Button>
                </Space>
            })}
            <Button icon={<UploadOutlined/>} onClick={addImage}>Загрузить новое фото</Button>

        </div>
    );
};

export default ModifiedTextEditorComponent;