import { Col, Layout, Row } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { ReactElement } from "react";
import Login from "../components/login/Login";

const LoginPage = (): ReactElement => {
    return (
    <Layout>
        <Header><p style={{color: 'white'}}>Entrevista Moveapps</p></Header>
        <Content>
            <Row justify="center" align="middle">
                <Col>
                    <br/>
                    <Login />
                </Col>
            </Row>
        </Content>
        <Footer>2021</Footer>
    </Layout>
    )
}   

export default LoginPage;