import { Col, Form, message, Row } from 'antd';
import { ReactElement } from 'react';
import { FormState } from '../../hooks/useFormState';
import { UserInfoFormData } from '../../utils/formUtils/UserFormUtils';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import DateInput from '../Inputs/DateInput';
import FormButtons from '../FormButtons';
import { FormInstance, useForm } from 'antd/lib/form/Form';

interface UserInfoFormProps {
    formState: FormInstance<UserInfoFormData>;
    onFinish: () => void;
    readOnly?: boolean;
}

const UserInfoForm = ({
    formState,
    onFinish,
    readOnly
}: UserInfoFormProps): ReactElement => {

    const {firstname, lastname, rut, address, email, comuna, sex, age} = formState.getFieldsValue();

    const onFinishFailed = () => {
        message.error("Existen errores en el formulario");
    }

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form form={formState} initialValues={formState.getFieldsValue()} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={colSpacing}>
                {/* NOMBRES Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='firstname'
                        type='text'
                        value={firstname} 
                        label='Nombres'
                        placeholder='Nombres'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
                </Col>
                {/* APELLIDOS Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='lastname' 
                        type='text'
                        value={lastname} 
                        label='Apellidos'
                        placeholder='Apellidos'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
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
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
                </Col>
                {/* EMAIL Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='email' 
                        type='text'
                        value={email}  
                        label='Correo electrónico'
                        placeholder='Correo electrónico'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                        rules={[{
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
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
                </Col>
                {/* COMUNA Input */}
                <Col xs={24} sm={24} md={4}>
                    <Input 
                        id="comuna"
                        // options={comunasChile.comunas} 
                        label="Comuna"
                        placeholder="Seleccione una comuna"
                        required disabled={readOnly}                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})} 
                        value={comuna} 
                        type='text'                    /> 
                </Col>
                {/* SEXO Input */}
                <Col xs={24} sm={24} md={8}>
                    <SelectInput 
                        id="sex"
                        value={sex}
                        options={['Masculino', 'Femenino', 'Prefiere no decir']} 
                        label="Sexo"
                        placeholder="Seleccione"
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    /> 
                </Col>
                {/* FECHA NACIMIENTO Input */}
                <Col xs={24} sm={24} md={4}>
                    <Input 
                        id="age"
                        type="number"
                        value={age}
                        label="Edad"
                        onChange={(fieldName, value) => formState.setFieldsValue({ [fieldName]: value })}
                        placeholder={'Edad'} 
                        required                   
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormButtons disabled={readOnly} onBackButtonClick={() => {}} />
                </Col>
            </Row>
        </Form> 
    );
}

export default UserInfoForm;