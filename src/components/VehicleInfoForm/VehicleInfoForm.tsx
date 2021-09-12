import { Col, Form, message, Row } from 'antd';
import { ReactElement, useEffect } from 'react';
import { FormState } from '../../hooks/useFormState';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import { VehicleInfoFormData } from '../../utils/formUtils/VehicleFormUtils';
import carTypes from '../../assets/vehicleTypes.json'
import DateInput from '../Inputs/DateInput';
import FormButtons from '../FormButtons';
import { useForm } from 'antd/lib/form/Form';

interface VehicleInfoFormProps {
    formState: FormState<VehicleInfoFormData>;
    onFinish: () => void;
    onBackStep: () => void;
}

const VehicleInfoForm = ({
    formState,
    onFinish,
    onBackStep,
}: VehicleInfoFormProps): ReactElement => {
    const [form] = useForm();

    useEffect(() => {

    })

    const {year, color, licensePlate} = formState.value;
    // console.log({'alltouched': form.isFieldsTouched(true)})
    // console.log({'errors' : form.getFieldsError()})
    const onSubmit = (direction: 'forward' | 'back' = 'forward') => { 
        const isFormValid = (form.getFieldsError().filter(({ errors }) => errors.length).length == 0) && form.isFieldsTouched(true);
        if (!isFormValid) {
            console.log(form.getFieldsError());
            return;
        }
        direction === 'forward' ? onFinish() : onBackStep();
    }

    const onFinishFailed = () => {
        message.error("Existen errores en el formulario");
    }

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form form={form} layout="vertical" onFinish={() => onSubmit('forward')} onFinishFailed={onFinishFailed}>
            <Row gutter={colSpacing}>
                {/* CAR TYPE Input */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <SelectInput 
                        id="type" 
                        options={carTypes.carTypes}
                        label={'Tipo de vehículo'} 
                        placeholder={'Seleccione'} 
                        onChange={formState.handleFieldChange}
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
                        onChange={formState.handleFieldChange}
                        required
                        rules={[{max: new Date().getFullYear() + 1, message: "Ingrese un año valido"}]}
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
                        onChange={formState.handleFieldChange}
                        required
                    />
                 </Col>
                {/* LICENSE PLATE Input */}
                <Col xs={24} sm={24} md={8} lg={6}>
                    <Input 
                        id='licensePlate' 
                        type='text'
                        value={licensePlate} 
                        label='Placa patente'
                        placeholder='Ej: XH6640'
                        onChange={formState.handleFieldChange}
                        required
                    />
                 </Col>
                 <Col xs={24} sm={24} md={4} lg={4}>
                    <DateInput id="purchaseDate" label="Fecha compra" onChange={formState.handleFieldChange} required/>
                 </Col>
            </Row>
            <Row>
                <FormButtons onForwardButtonClick={() => onSubmit('forward')} onBackButtonClick={() => onSubmit('back')} />
            </Row>
        </Form> 
    );
}

export default VehicleInfoForm;