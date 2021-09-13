import { Col, Form, message, Row } from 'antd';
import { ReactElement } from 'react';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import { VehicleInfoFormData } from '../../utils/formUtils/VehicleFormUtils';
import carTypes from '../../assets/vehicleTypes.json'
import DateInput from '../Inputs/DateInput';
import FormButtons from '../FormButtons';
import { FormInstance } from 'antd/lib/form/Form';

interface VehicleInfoFormProps {
    formState: FormInstance<VehicleInfoFormData>;
    onFinish: () => void;
    onBackStep: () => void;
    readOnly?: boolean;
}

const VehicleInfoForm = ({
    formState,
    onFinish,
    onBackStep,
    readOnly
}: VehicleInfoFormProps): ReactElement => {
    const {year, color, licensePlate, type, purchaseDate} = formState.getFieldsValue();

    const onSubmit = (direction: 'forward' | 'back' = 'forward') => { 
        const isFormValid = (formState.getFieldsError().filter(({ errors }) => errors.length).length === 0);
        // const errors = getErrors();
        if (!isFormValid) {
            // const isFormValid = errors.length == 0;
            console.log({'alltouched': formState.isFieldsTouched(true)})
            console.log({'errors' : formState.getFieldsError()})
            message.error('Hay errores en el formulario');
            return;
        }
        direction === 'forward' ? onFinish() : onBackStep();
    }

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form 
            form={formState} 
            initialValues={formState.getFieldsValue()} 
            layout="vertical" 
            onFinish={() => onSubmit('forward')}
            onFinishFailed={() => {message.error('Existen errores en el formulario, todos los campos son obligatorios')}}
        >
            <Row gutter={colSpacing}>
                {/* CAR TYPE Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <SelectInput 
                        id="type" 
                        value={type}
                        options={carTypes.carTypes}
                        label={'Tipo de vehículo'} 
                        placeholder={'Seleccione'} 
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required                      
                    />
                </Col>
                {/* CAR YEAR Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='year' 
                        type='number'
                        value={year} 
                        label='Año del vehiculo'
                        placeholder='Año del vehiculo'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                        rules={[{max: new Date().getFullYear() + 1, message: "Ingrese un año valido"}]}
                    />
                 </Col>
            </Row>
            <Row gutter={colSpacing}>
                {/* COLOR Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='color' 
                        type='text'
                        value={color} 
                        label='Color de vehículo'
                        placeholder='Ej: Azul electrico'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
                 </Col>
                {/* LICENSE PLATE Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Input 
                        id='licensePlate' 
                        type='text'
                        value={licensePlate} 
                        label='Placa patente'
                        placeholder='Ej: XH6640'
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})}
                        required disabled={readOnly}                    />
                 </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <DateInput 
                        id="purchaseDate" 
                        valueUnixTime={purchaseDate}
                        label="Fecha compra" 
                        onChange={(fieldName, value) => formState.setFieldsValue({[fieldName] : value})} 
                        required disabled={readOnly}                    />
                 </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormButtons disabled={readOnly} onBackButtonClick={onBackStep} />
                </Col>
            </Row>
        </Form> 
    );
}

export default VehicleInfoForm;