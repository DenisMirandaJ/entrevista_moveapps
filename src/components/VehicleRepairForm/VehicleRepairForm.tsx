import { ReactElement, useState } from 'react';
import useFormState from '../../hooks/useFormState';
import { getEmptyUserInfoForm } from '../../utils/formUtils/UserFormUtils';
import { getEmptyVehicleInfoForm } from '../../utils/formUtils/VehicleFormUtils';
import { getEmptyVehiclePhotosForm } from '../../utils/formUtils/vehiclePhotosUtils';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import VehicleInfoForm from '../VehicleInfoForm/VehicleInfoForm';
import VehiclePhotos from '../VehiclePhotos/VehiclePhotos';

const VehicleRepairForm = (): ReactElement =>{
    const userFormState = useFormState(getEmptyUserInfoForm())
    const vehicleFormState = useFormState(getEmptyVehicleInfoForm())
    const [vehicleImages, setVehicleImages] = useState(getEmptyVehiclePhotosForm())

    return (
        <>
            <UserInfoForm formState={userFormState} />
            <VehicleInfoForm formState={vehicleFormState} />
            <VehiclePhotos vehicleImages={vehicleImages} setVehicleImages={setVehicleImages} />
        </>
    );
}

export default VehicleRepairForm;