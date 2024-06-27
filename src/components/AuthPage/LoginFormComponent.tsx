import React from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import loginArgs from "../../models/loginArgs";


interface onFinishType {
    (args: loginArgs): void;
}
interface LoginFormProps {
    onFinish: onFinishType;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({onFinish}) => {


    return (
        <div>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username" autoComplete={"on"}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                        autoComplete={"on"}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>


                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginFormComponent;