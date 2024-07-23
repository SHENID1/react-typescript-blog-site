import React, {useEffect, useState} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {Skeleton, type UploadFile, UploadProps} from 'antd';
import {message, Upload} from 'antd';
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import OtherInfoApi from "../../api/otherInfoApi";
import ICert from "../../models/ICert";

const {Dragger} = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: `${ApiUrl}/api/cert/files`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    withCredentials: true,
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} файл загружен успешно.`).then();
        } else if (status === 'error') {
            message.error(`${info.file.name} не удалось загрузить файл.`).then();
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove: ImageApi.deleteCert,
};

const getFilesDataByNames = (data: ICert[]) => {
    if (data.length === 0) return undefined;
    let t: UploadFile[] = [];
    data.forEach((item, index) => {
        t.push({
        uid: `id_${item.name + index}`,
        name: item.name,
        status: 'done',
        url: `${ApiUrl}/${item.name}`,
    });
    })
    return t
}
const CertificatesDashboard: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [initV, setInitV] = useState<UploadFile[]>([]);

    useEffect(() => {
        OtherInfoApi.getCerts().then((data) => {
            const ii = getFilesDataByNames(data);
            if (ii) setInitV(ii);
            setLoading(false);
        })
    }, []);

    if (loading) return <><h1>Добавление/Удаление Сертификатов</h1><Skeleton active/></>
    return (
        <div>
            <h1>Добавление/Удаление Сертификатов</h1>

            <Dragger {...props} defaultFileList={initV}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Щелкните или перетащите файл в эту область для загрузки</p>
                <p className="ant-upload-hint">
                    Поддерживается однократная или массовая загрузка.<br/>
                    Не используйте в названии файла кириллицу или пробелы.<br/>
                    В противном случае файлу будет присвоено имя в формате
                    497a7d34-1cb9-49fb-a5c5-1f536ae3747a.pdf
                </p>
            </Dragger></div>

    )
};

export default CertificatesDashboard;