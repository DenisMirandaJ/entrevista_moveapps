import { Col, Layout, Row, Space } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { createContext, ReactElement, useState } from "react";
import Login from "../components/login/Login";
import FormAuth from "../components/router/FormAuth";

export const FormStepContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>] | null>(null);

const LoginPage = (): ReactElement => {
    const formStepState = useState(1);
    return (
    <Layout>
        <Header><p style={{color: 'white'}}>Entrevista Moveapps</p></Header>
        <Content>
            <Row justify="center">
                <Col>
                    <br/>
                    <FormStepContext.Provider value={formStepState}>
                        <FormAuth />
                    </FormStepContext.Provider>
                </Col>
            </Row>
        </Content>
        <Footer>2021</Footer>
    </Layout>
    )
}   

export default LoginPage;