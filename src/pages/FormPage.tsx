import { Col, Layout, Row, Steps } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { createContext, ReactElement, useState } from "react";
import FormAuth from "../components/router/FormAuth";
const {Step} = Steps;

export const FormStepContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>] | null>(null);

const LoginPage = (): ReactElement => {
    const formStepState = useState(1);
    const breakpoint = useBreakpoint();
    return (
    <Layout>
        <Header><p style={{color: 'white'}}>Entrevista Moveapps</p></Header>
        <Content>
            <Row justify="center">
                <Col>
                    <br />
                    {
                        (!breakpoint.sm || !breakpoint.xs) &&
                        <Steps current={formStepState[0] - 1}>
                            <Step title="Datos personales" description="Todos los campos son obligatorios" />
                            <Step title="Datos  vehículo" />
                            <Step title="Fotos" />
                            <Step title="Fechas" />
                        </Steps>   
                    }
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