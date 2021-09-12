import axios from 'axios';
import { RepairDateSelectorFormData } from '../utils/formUtils/CalendarUtils';
import { UserInfoFormData } from '../utils/formUtils/UserFormUtils';
import { VehicleInfoFormData } from '../utils/formUtils/VehicleFormUtils';
import { VehiclePhotosFormData } from '../utils/formUtils/vehiclePhotosUtils';

export type VehicleRepairRequestInt =  UserInfoFormData & VehicleInfoFormData & VehiclePhotosFormData & RepairDateSelectorFormData;

export const VehicleRepairRequest = async (data: VehicleRepairRequestInt): Promise<VehicleRepairRequestInt> => {
    const response = await axios.post<VehicleRepairRequestInt>('/submit-vehicle-repair-form', data);
    return response.data;
}