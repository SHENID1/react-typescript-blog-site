import React from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import loginArgs from "../../models/loginArgs";
import cl from "./style.module.css";

interface onFinishType {
    (args: loginArgs): void;
}

interface LoginFormProps {
    onFinish: onFinishType;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({onFinish}) => {


    return (
        <div className={cl.contAll}>
            <div className={cl.contForm}>
                <div className={cl.nameForm}>
                    Авторизация
                </div>
                <Form
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Пожалуйста, укажите логин!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Имя пользователя"
                               autoComplete={"on"}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Пароль"
                            autoComplete={"on"}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>


                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default LoginFormComponent;