import { ReactElement, useState } from 'react';
import useFormState from '../../hooks/useFormState';
import { getEmptyUserInfoForm } from '../../utils/formUtils/UserFormUtils';
import { getEmptyVehicleInfoForm } from '../../utils/formUtils/VehicleFormUtils';
import { getEmptyVehiclePhotosForm } from '../../utils/formUtils/vehiclePhotosUtils';
import RepairDateSelector from '../RepairDatesSelector/RepairDatesSelector';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import VehicleInfoForm from '../VehicleInfoForm/VehicleInfoForm';
import VehiclePhotos from '../VehiclePhotos/VehiclePhotos';
import 'moment/locale/es-mx';
import moment from 'moment';
import { getEmptyRepairDateSelectorForm } from '../../utils/formUtils/CalendarUtils';
moment.locale('es');
moment.updateLocale('en', {
    weekdaysMin : ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
});


const VehicleRepairForm = (): ReactElement =>{
    const userFormState = useFormState(getEmptyUserInfoForm())
    const vehicleFormState = useFormState(getEmptyVehicleInfoForm())
    const [vehicleImages, setVehicleImages] = useState(getEmptyVehiclePhotosForm())
    const CalendarFormstate = useFormState(getEmptyRepairDateSelectorForm())

    return (
        <>
            <UserInfoForm formState={userFormState} />
            <VehicleInfoForm formState={vehicleFormState} />
            <VehiclePhotos vehicleImages={vehicleImages} setVehicleImages={setVehicleImages} />
            <RepairDateSelector formState={CalendarFormstate}/>
        </>
    );
}

export default VehicleRepairForm;