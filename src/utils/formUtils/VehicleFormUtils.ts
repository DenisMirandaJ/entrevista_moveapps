
export interface VehicleInfoFormData {
    type: string;
    year: number;
    color: string;
    licensePlate: string;
    purchaseDate: Date | null;
} 

export const getEmptyVehicleInfoForm = (): VehicleInfoFormData => {
    return {
        type: '',
        year: 2000,
        color: '',
        licensePlate: '',
        purchaseDate: null,
    }
}