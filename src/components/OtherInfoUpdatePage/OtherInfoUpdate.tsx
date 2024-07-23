import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Form, Input, message, Skeleton, Space} from "antd";
import ModifiedTextEditorComponent from "../ModifiedTextEditor/ModifiedTextEditorComponent";
import cl from "../PostUpdateComponent/style.module.css";
import IOtherInfo from "../../models/IOtherInfo";
import OtherInfoApi from "../../api/otherInfoApi";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} нужно указать!'
};
/* eslint-enable no-template-curly-in-string */


const OtherInfoUpdate = () => {
    const {name} = useParams()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<string[]>(["htmlText <span></span>"]);
    const [initialValues, setInitialValues] = useState<IOtherInfo | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Успешно обновлено',
        }).then();
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Произошла сетевая ошибка',
        }).then();
    };
    const LoadData = async () => {
        if (!name) throw new Error("name must be provided");
        const initV = await OtherInfoApi.getOtherInfoByName(name)

        setInitialValues(initV)
        return true
    }
    useEffect(() => {
        LoadData().then(() => {
            setLoading(false);
        }).catch()
        // eslint-disable-next-line
    }, []);
    const onFinish = (values: any) => {
        // console.log(values);
        values.content = data
        // console.log(values);
        OtherInfoApi.update(values).then(() => {
            success();
        }).catch(() => error())
    }
    const handlerData = (arr: string[]) => setData(arr);


    if (!name) return null;
    if (loading) return <Skeleton active/>
    return (
        <div>
            <h1>{name}</h1>
            {contextHolder}
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                form={form}
                onFinish={onFinish}
                    name={"1"}
                validateMessages={validateMessages}
                initialValues={initialValues ? initialValues : undefined}
            >
                <Form.Item label="Имя" name={"name"} rules={[{required: true}]} >
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item label="Контент" name={"content"} rules={[{required: true}]}>
                    <ModifiedTextEditorComponent getData={handlerData} initialContent={initialValues?.content}/>
                </Form.Item>
                <br/>
                <Space>
                    <Button type="primary" size="large" htmlType="submit" className={cl.submitButton}>Сохранить</Button>
                </Space>
            </Form>
        </div>
    );
};

export default OtherInfoUpdate;