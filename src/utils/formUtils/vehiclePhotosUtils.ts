export interface ImageInt {
    uid: string;
    name: string;
    base64: string;
}

export interface VehiclePhotosFormData {
    frontSide: ImageInt[];
    backSide: ImageInt[];
    leftSide: ImageInt[];
    rightSide: ImageInt[];
}

export const getEmptyVehiclePhotosForm = (): VehiclePhotosFormData => {
    return {
        frontSide: [],
        backSide: [],
        rightSide: [],
        leftSide: [],
    }
}