import { UploadFile } from "antd/lib/upload/interface"

export interface ImageInt {
    uid: string;
    name: string;
    base64: string;
}

export interface VehiclePhotosFormData {
    frontSide: UploadFile[];
    backSide: UploadFile[];
    leftSide: UploadFile[];
    rightSide: UploadFile[];
}

export const getEmptyVehiclePhotosForm = (): VehiclePhotosFormData => {
    return {
        frontSide: [],
        backSide: [],
        rightSide: [],
        leftSide: [],
    }
}