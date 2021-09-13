
export interface VehicleInfoFormData {
    type: string;
    year: number | string;
    color: string;
    licensePlate: string;
    purchaseDate: number | null;
} 

export const getEmptyVehicleInfoForm = (): VehicleInfoFormData => {
    return {
        type: '',
        year: '',
        color: '',
        licensePlate: '',
        purchaseDate: null,
    }
}