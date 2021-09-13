import { Button, Col, Divider, message, Row } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import { ReactElement } from "react";
import { useHistory } from "react-router";
import { VehicleRepairRequest, VehicleRepairRequestInt } from "../../requests/VehicleRepairFormRequests";
import { ImageInt } from "../../utils/formUtils/vehiclePhotosUtils";

export interface StepForm {
    step: number;
    title: string;
    content: JSX.Element;
}

interface ReceiptProps {
    stepForm: StepForm[];
    data: VehicleRepairRequestInt | null | string;
    onCancel: () => void;
}

//Renderiza los formularios con el prop añadido readOnly
const Receipt = ({stepForm, data, onCancel}: ReceiptProps): ReactElement => {
    const history = useHistory();

    const getBase64ImageFromCarPhotos = (carImageList: UploadFile[]): ImageInt[] => {
        return carImageList.map((image) => {
            return {
                uid: image.uid as string,
                base64: image.thumbUrl as string,
                name: image.name,
            }
        })
    }
    const sendRequest = async () => {
        if (!data) {    
            throw new Error("Sin datos en el formulario");
        }
        const response: VehicleRepairRequestInt = await VehicleRepairRequest(data as VehicleRepairRequestInt);
        console.log({
            ...response, 
            frontSide: getBase64ImageFromCarPhotos(response.frontSide),
            backSide: getBase64ImageFromCarPhotos(response.backSide),
            leftSide: getBase64ImageFromCarPhotos(response.leftSide),
            rightSide: getBase64ImageFromCarPhotos(response.rightSide)
        });
        localStorage.clear();
        message.success('Formulario completado, Muchas gracias!. Su sesión se cerrará', 10);
        history.push('/');
    }

    if (!stepForm) {
        return <></>;
    }
    //@ts-ignore
    const receipt = stepForm.map((form) => {
        //Clonamos los componentes de formulario agregandoles a cada un el prop readOnly
        //De ese modo sirven para visualización
        return (
          <>
                {
                    React.cloneElement(
                        form.content,
                        {readOnly: true}
                    )
                }
            <Divider />
          </>
        )
      })

    return (
      <>
        <b>
            <p>Por favor revise los datos ingresados. Encontrará un boton de confirmación al final de la página</p>
        </b>
        {receipt}
        <Row gutter={1}>
           <Col span={12}>
                <Button block type="primary" onClick={sendRequest}>
                    Enviar formulario
                </Button>
           </Col>
           <Col span={12}>
                <Button block onClick={onCancel}>
                    Corregir datos
                </Button>
           </Col>  
        </Row>
        
      </>
    )
}

export default Receipt;