import { Col, Row } from "antd";
import { Gutter } from "antd/lib/grid/row";
import { UploadFile } from "antd/lib/upload/interface";
import { ReactElement } from "react";
import { VehiclePhotosFormData } from "../../utils/formUtils/vehiclePhotosUtils";
import PhotoList from "./PhotoList";

interface VehiclePhotosProps {
    vehicleImages: VehiclePhotosFormData;
    setVehicleImages: React.Dispatch<React.SetStateAction<VehiclePhotosFormData>>
}

const VehiclePhotos = ({
    vehicleImages,
    setVehicleImages
}: VehiclePhotosProps): ReactElement => {

    const onImageListChange = (imageSetName: keyof VehiclePhotosFormData , newImageList: UploadFile[]) => {
        //TODO: remove unused UploadFile items
        setVehicleImages({...vehicleImages, [imageSetName]: newImageList})
    }

    const gridGutter: [Gutter, Gutter] = [{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]

    return (
        <>
        <Row gutter={gridGutter}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <PhotoList 
                    uploadedImages={vehicleImages.frontSide} 
                    onImageListChange={(newImageList) => onImageListChange('frontSide', newImageList)}
                    uploadText={'Frente del vehiculo'}
                />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <PhotoList 
                    uploadedImages={vehicleImages.backSide} 
                    onImageListChange={(newImageList) => onImageListChange('frontSide', newImageList)}
                    uploadText={'Parte trasera del vehiculo'}
                />
                
            </Col>
        </Row>
        <Row gutter={gridGutter}>
            <Col xs={24} sm={24} md={12} lg={12}>
                <PhotoList 
                    uploadedImages={vehicleImages.leftSide} 
                    onImageListChange={(newImageList) => onImageListChange('frontSide', newImageList)} 
                    uploadText={'Izquierda del vehiculo'}
                />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
                <PhotoList 
                    uploadedImages={vehicleImages.rightSide} 
                    onImageListChange={(newImageList) => onImageListChange('frontSide', newImageList)}
                    uploadText={'Derecha del vehiculo'}
                />
            </Col>
        </Row>
        </>
    )
}

export default VehiclePhotos;