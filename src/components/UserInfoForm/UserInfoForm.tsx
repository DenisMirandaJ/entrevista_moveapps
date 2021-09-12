import { Col, Form, message, Row } from 'antd';
import { ReactElement } from 'react';
import { FormState } from '../../hooks/useFormState';
import { UserInfoFormData } from '../../utils/formUtils/UserFormUtils';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import DateInput from '../Inputs/DateInput';
import FormButtons from '../FormButtons';
import { useForm } from 'antd/lib/form/Form';

interface UserInfoFormProps {
    formState: FormState<UserInfoFormData>;
    onFinish: () => void;
    onBackStep: () => void;
}

const UserInfoForm = ({
    formState,
    onFinish,
    onBackStep,
}: UserInfoFormProps): ReactElement => {

    const [form] = useForm();

    const {firstname, lastname, rut, address, email, comuna, sex, birthDate} = formState.value;

    const onFinishFailed = () => {
        message.error("Existen errores en el formulario");
    }
    
    const getErrors = () => {
        if (
            [firstname, lastname, rut, address, email, comuna, sex].includes('') ||
            !birthDate
        ) {
            return ['Todos los campos son obligatorios'];
        }
        return [];
    }

    const  onSubmit = (direction: 'forward' | 'back' = 'forward') => { 
        // const isFormValid = form.getFieldsError().filter(({ errors }) => errors.length).length == 0 && form.isFieldsTouched();
        const isFormValid = getErrors().length;
        if (!isFormValid) {
            return;
        }
        direction === 'forward' ? onFinish() : onBackStep();
    }

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form form={form} layout="vertical" onFinish={() => onSubmit('forward')} onFinishFailed={onFinishFailed}>
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
                    <Input 
                        id="comuna"
                        // options={comunasChile.comunas} 
                        label="Comuna"
                        placeholder="Seleccione una comuna"
                        required
                        onChange={formState.handleFieldChange} 
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
                        onChange={formState.handleFieldChange}
                        required
                    /> 
                </Col>
                {/* FECHA NACIMIENTO Input */}
                <Col xs={24} sm={24} md={4}>
                    <DateInput id="birthDate" label="Fecha de nacimiento" onChange={formState.handleFieldChange} required/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormButtons onForwardButtonClick={() => onSubmit('forward')} onBackButtonClick={() => onSubmit('back')} />
                </Col>
            </Row>
        </Form> 
    );
}

export default UserInfoForm;