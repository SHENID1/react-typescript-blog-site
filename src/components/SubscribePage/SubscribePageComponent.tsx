import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import MailerApi from "../../api/mailApi";


type FinishProps = {
    email: string;
}

const SubscribePageComponent = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = React.useState<boolean>(false);

    const handleFinish = (props: FinishProps) => {
        form.resetFields();
        MailerApi.create(props.email).then(
            (res: any) => {

                console.log(res);
            }
        )
    }

    return (
        <div>
            <h1>Подписаться на рассылку</h1>
            <Form
                form={form}
                onFinish={handleFinish}
            >
                <Form.Item label={"Электронная почта"} name={"email"} rules={[
                    {
                        type: 'email',
                        message: 'Пожалуйста, введите корректную почту',
                    },
                    {
                        required: true,
                        message: 'Укажите почту!',
                    },
                ]}>
                    <Input placeholder={"example@gmail.com"} type={"email"}/>
                </Form.Item>
                <Form.Item
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Требуется согласие на обработку персональных данных')),
                        },
                    ]}
                    name="agreement"
                >
                    <Checkbox>
                        Я прочитал и ознакомлен <a href="/privacy" target={"_blank"}>с политикой конфидициальности</a>
                    </Checkbox>
                </Form.Item>
                <Button type="primary" htmlType="submit">Отправить</Button>
            </Form>
        </div>
    );
};

export default SubscribePageComponent;