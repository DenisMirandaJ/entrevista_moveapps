import { Button, Col, Form, Row } from 'antd';
import { ReactElement } from 'react';
import { FormState } from '../../hooks/useFormState';
import { UserInfoFormData } from '../../utils/formUtils/UserFormUtils';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import comunasChile from '../../assets/comunasChile.json'
import DateInput from '../Inputs/DateInput';

interface UserInfoFormProps {
    formState: FormState<UserInfoFormData>
}

const UserInfoForm = ({
    formState,
}: UserInfoFormProps): ReactElement => {

    const {firstname, lastname, rut, address, email} = formState.value;

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form layout="vertical" onFinish={() => alert("hola")} onFinishFailed={() => alert("error")}>
            <Row gutter={colSpacing}>
                {/* NOMBRES Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='firstname'
                        type='text'
                        value={firstname} 
                        label='Nombres'
                        placeholder='Nombres'
                        onChange={formState.handleFieldChange}
                        required
                    />
                </Col>
                {/* APELLIDOS Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='lastname' 
                        type='text'
                        value={lastname} 
                        label='Apellidos'
                        placeholder='Apellidos'
                        onChange={formState.handleFieldChange}
                        required
                    />
                 </Col>
            </Row>
            <Row gutter={colSpacing}>
                {/* RUT Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='rut'
                        type='text'
                        value={rut} 
                        label='RUT'
                        placeholder='RUT'
                        onChange={formState.handleFieldChange}
                        required
                    />
                </Col>
                {/* EMAIL Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='email' 
                        type='text'
                        value={email}  
                        label='Correo electrónico'
                        placeholder='Correo electrónico'
                        onChange={formState.handleFieldChange}
                        required
                        rules={[{
                            pattern:/^[a-z0-9_.-]+@[\da-z.-]+\.[a-z.]{2,6}$/,
                            'message': "Ingrese un correo válido"
                        }]}
                    />
                </Col>
            </Row>
            <Row gutter={colSpacing}>
                {/* DIRECCION Input */}
                <Col xs={24} sm={24} md={8}>
                    <Input 
                        id='address' 
                        type='text'
                        value={address}  
                        label='Dirección'
                        placeholder='Ej: Pasaje Aventuras 1254, Calama'
                        onChange={formState.handleFieldChange}
                        required
                    />
                </Col>
                {/* COMUNA Input */}
                <Col xs={24} sm={24} md={4}>
                    <SelectInput 
                        id="comuna"
                        options={comunasChile.comunas} 
                        label="Comuna"
                        placeholder="Seleccione una comuna"
                        required
                        onChange={formState.handleFieldChange}
                    /> 
                </Col>
                {/* SEXO Input */}
                <Col xs={24} sm={24} md={8}>
                    <SelectInput 
                        id="sex"
                        options={['Masculino', 'Femenino', 'Prefiere no decir']} 
                        label="Sexo"
                        placeholder="Seleccione"
                        onChange={formState.handleFieldChange}
                    /> 
                </Col>
                {/* FECHA NACIMIENTO Input */}
                <Col xs={24} sm={24} md={4}>
                    <DateInput id="birthDate" label="Fecha de nacimiento" onChange={formState.handleFieldChange} required/>
                </Col>
            </Row>
            <Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Row>
        </Form> 
    );
}

export default UserInfoForm;