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
import { VehicleRepairRequest, VehicleRepairRequestInt } from '../../requests/VehicleRepairFormRequests';
moment.locale('es');
moment.updateLocale('en', {
    weekdaysMin : ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
});


const VehicleRepairForm = (): ReactElement =>{
    const userFormState = useFormState(getEmptyUserInfoForm())
    const vehicleFormState = useFormState(getEmptyVehicleInfoForm())
    const [vehicleImages, setVehicleImages] = useState(getEmptyVehiclePhotosForm())
    const CalendarFormstate = useFormState(getEmptyRepairDateSelectorForm())
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState<VehicleRepairRequestInt | null>(null);
    
    const [step, setStep] = useState(1);

    const nextStep = () => {setStep(step + 1)}
    const returnOneStep = () => {
        if (step <= 1) {
            return;
        }
        setStep(step - 1);
    }

    const onSubmit = async () => {
      const data: VehicleRepairRequestInt = {...userFormState.value, ...vehicleFormState.value, ...vehicleImages, ...CalendarFormstate.value};
      const response: VehicleRepairRequestInt = await VehicleRepairRequest(data);
      setShowReceipt(true);
      setReceiptData(response);
    }

    if (showReceipt) {
      return <div><pre>{receiptData}</pre></div>;
    }

    switch (step) {
        case 1:
          return <UserInfoForm onFinish={nextStep} onBackStep={returnOneStep} formState={userFormState} />
        case 2:
          return <VehicleInfoForm onFinish={nextStep} onBackStep={returnOneStep} formState={vehicleFormState} />
        case 3:
          return <VehiclePhotos onFinish={nextStep} onBackStep={returnOneStep} vehicleImages={vehicleImages} setVehicleImages={setVehicleImages} />
        case 4:
          return <RepairDateSelector onFinish={onSubmit} onBackStep={returnOneStep} formState={CalendarFormstate} />
        default:
          return <>""</>;
    }
}

export default VehicleRepairForm;