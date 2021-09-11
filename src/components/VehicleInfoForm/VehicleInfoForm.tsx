import { Button, Col, Form, Row } from 'antd';
import { ReactElement } from 'react';
import { FormState } from '../../hooks/useFormState';
import Input from '../Inputs/Input';
import SelectInput from '../Inputs/SelectInput';
import { VehicleInfoFormData } from '../../utils/formUtils/VehicleFormUtils';
import carTypes from '../../assets/vehicleTypes.json'
import DateInput from '../Inputs/DateInput';

interface VehicleInfoFormProps {
    formState: FormState<VehicleInfoFormData>
}

const VehicleInfoForm = ({
    formState,
}: VehicleInfoFormProps): ReactElement => {

    const {year, color, licensePlate} = formState.value;

    const colSpacing ={ xs: 8, sm: 16, md: 24, lg: 32 }
    return (
        <Form layout="vertical" onFinish={() => alert("hola")} onFinishFailed={() => alert("error")}>
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Row>
        </Form> 
    );
}

export default VehicleInfoForm;