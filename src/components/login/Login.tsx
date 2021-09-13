import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/lib/form/Form";
import { ReactElement, useState } from "react"
import { useHistory } from "react-router";
import { loginRequest } from "../../requests/loginRequest";



const Login = (): ReactElement => {
    const [form] = useForm<{mail: string, password: string}>();
    const history = useHistory();

    const onSubmit = async () => {
        const { mail, password } = form.getFieldsValue();
        try {
            const jwt = await loginRequest(mail, password);
            localStorage.setItem('jwt', jwt);
            history.push('/form')
        } catch (error) {
            message.error("Credenciales Incorrectas!");
        }
    }

    const onFinishFailed = () => {
        message.error("Todos los campos son obligatorios");
    }

    return (
        <div className="login-form">
        <Form  
            form={form}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item name='mail' rules={[{ required: true, message: 'Campo requerido' }]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Correo electrónico"
                /> 
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: 'Campo requerido' }]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                /> 
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Iniciar sesión
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}   

export default Login;