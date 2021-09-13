import { ReactElement, useContext, useState } from 'react';
import { UserInfoFormData } from '../../utils/formUtils/UserFormUtils';
import { VehicleInfoFormData } from '../../utils/formUtils/VehicleFormUtils';
import { getEmptyVehiclePhotosForm } from '../../utils/formUtils/vehiclePhotosUtils';
import RepairDateSelector from '../RepairDatesSelector/RepairDatesSelector';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import VehicleInfoForm from '../VehicleInfoForm/VehicleInfoForm';
import VehiclePhotos from '../VehiclePhotos/VehiclePhotos';
import 'moment/locale/es-mx';
import moment from 'moment';
import { VehicleRepairRequestInt } from '../../requests/VehicleRepairFormRequests';
import { useForm } from 'antd/lib/form/Form';
import Receipt from '../Receipt/Receipt';
import { FormStepContext } from '../../pages/FormPage';
moment.locale('es');
moment.updateLocale('en', {
    weekdaysMin : ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
});


const VehicleRepairForm = (): ReactElement =>{
    const [userFormState] = useForm<UserInfoFormData>();
    const [vehicleFormState] = useForm<VehicleInfoFormData>();
    const [vehicleImages, setVehicleImages] = useState(getEmptyVehiclePhotosForm());
    const calendarFormstate = useState<{startDate: number | null, endDate: number | null}>(
      {startDate: null, endDate: null}
    );
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState<VehicleRepairRequestInt | null | string>(null);
    
    const [step, setStep] = useContext(FormStepContext) as ([number, React.Dispatch<React.SetStateAction<number>>])

    const nextStep = () => {
      setStep(step + 1);
    }
    const returnOneStep = () => {
        if (step <= 1) {
            return;
        }
        setStep(step - 1);
    }

    const onSubmit = async () => {
      //Merging the data objects
        const data: VehicleRepairRequestInt = {
        //clonamos los valores de los campos
        ...{...userFormState.getFieldsValue()}, 
        ...{...vehicleFormState.getFieldsValue()}, 
        ...vehicleImages, 
        ...calendarFormstate[0]
      };
      setReceiptData(data);
      setShowReceipt(true);
    }

    const stepForm = [
      {
        step: 1,
        title: "Por favor ingrese su información personal",
        content: <UserInfoForm readOnly={showReceipt} onFinish={nextStep} formState={userFormState} />
      },
      {
        step: 2,
        title: "Por favor ingrese la información de su vehiculo",
        content: <VehicleInfoForm readOnly={showReceipt} onFinish={nextStep} onBackStep={returnOneStep} formState={vehicleFormState} />
      },
      {
        step: 3,
        title: "Por favor ingrese fotos que muestren su vehiculo por sus cuatro lados",
        content: <VehiclePhotos readOnly={showReceipt} onFinish={nextStep} onBackStep={returnOneStep} vehicleImages={vehicleImages} setVehicleImages={setVehicleImages} />
      },
      {
        step: 4,
        title: "Ingrese la fecha de entrega del vehículo al taller y la fecha en que desea recogerlo, la demora minima es de 7 dias hábiles",
        content: <RepairDateSelector readOnly={showReceipt} onFinish={onSubmit} onBackStep={returnOneStep} formState={calendarFormstate} />
      },
    ];


    if (receiptData) {
      //@ts-ignore
      return <Receipt stepForm={stepForm} data={receiptData} />
    }

    return (
      <>
        {
          stepForm.map(form => {
            let style = undefined;
            if (form.step !== step) {
              style = {display: 'none'}
            }
            return (
              <div style={style}>
                <b>{form.title}</b>
                {form.content}
              </div>
            )
          })
        }
      </>
    )

    //This aproach failed due to form.getFieldsValue() not working when it's form is not in the dom
    // switch (step) {
    //     case 1:
    //       return <UserInfoForm onFinish={nextStep} formState={userFormState} />
    //     case 2:
    //       return <VehicleInfoForm onFinish={nextStep} onBackStep={returnOneStep} formState={vehicleFormState} />
    //     case 3:
    //       return <VehiclePhotos onFinish={nextStep} onBackStep={returnOneStep} vehicleImages={vehicleImages} setVehicleImages={setVehicleImages} />
    //     case 4:
    //       return <RepairDateSelector onFinish={onSubmit} onBackStep={returnOneStep} formState={calendarFormstate} />
    //     default:
    //       return <>""</>;
    // }
}

export default VehicleRepairForm;