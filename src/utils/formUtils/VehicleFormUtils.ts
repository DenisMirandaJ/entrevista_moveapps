
export interface VehicleInfoFormData {
    type: string;
    year: number | string;
    color: string;
    licensePlate: string;
    purchaseDate: Date | null;
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