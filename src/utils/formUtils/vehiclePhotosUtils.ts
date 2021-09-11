import { UploadFile } from "antd/lib/upload/interface"

export interface VehiclePhotosFormData {
    frontSide: UploadFile<any>[];
    backSide: UploadFile<any>[];
    leftSide: UploadFile<any>[];
    rightSide: UploadFile<any>[];
}

export const getEmptyVehiclePhotosForm = (): VehiclePhotosFormData => {
    return {
        frontSide: [],
        backSide: [],
        rightSide: [],
        leftSide: [],
    }
}