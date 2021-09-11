import { ReactElement, SetStateAction, useState } from 'react';
import { Col, Divider, message, Modal, Row, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { dummyUploadRequest } from '../../utils/formUtils/uploadUtils';


interface PhotoListProps {
    uploadedImages: UploadFile[];
    onImageListChange: (newImageList: UploadFile[]) => void;
    uploadText?: string;
    acceptedFileTypes?: string[]
    maxFileSize?: number;
    maxImages?: number;
}

const PhotoList = ({
    uploadedImages,
    onImageListChange,
    uploadText,
    acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'],
    maxFileSize = 15*1024,
    maxImages=4
}: PhotoListProps): ReactElement =>  {
    
    const [previewImage, setPreviewImage] = useState('') //Base64 encoded
    const [showPreview, setShowPreview] = useState(false)

    const getBase64 = (originFileObj: RcFile | undefined): Promise<string | null | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            if (!originFileObj) {
                reject(new Error('Invalid File'))
                return
            }
            const reader = new FileReader();
            reader.readAsDataURL(originFileObj);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            const base64PreviewImage = await getBase64(file.originFileObj);
            setPreviewImage(base64PreviewImage as string);
        }
        setShowPreview(true);
    }

    const handleNewImageUpload = (newImageListUploadObject : UploadChangeParam) => {
        let uploadedImages = newImageListUploadObject.fileList;
        uploadedImages = uploadedImages.map(image => {
            if (image.response) {
              image.url = image.response.url;
            }
            return image;
        });
        onImageListChange(uploadedImages);
    }

    const beforeUpload = (file : UploadFile) => {
        if (uploadedImages.length > maxImages) {
            message.error(`Solo se aceptan archivos del tipo jpg, png o jpeg`);
            return Upload.LIST_IGNORE;
        }
        if (!acceptedFileTypes) {
            return false;
        }
        if (!file.type) {
            return Upload.LIST_IGNORE;
        }
        if (!acceptedFileTypes.includes(file.type)) {
            message.error(`Solo se aceptan archivos del tipo jpg, png o jpeg`);
            return Upload.LIST_IGNORE;
        }
        if (!maxFileSize || !file.size) {
            return false
        }
        if (file.size/1024 > maxFileSize) {
            message.error(`Tamaño maximo de archivo superado (${maxFileSize/1024} MB)`);
            return Upload.LIST_IGNORE; 
        }
    }

    
    return (
        <>
            <Divider style={{ borderWidth: 2}} />
            <Upload
                beforeUpload={beforeUpload}
                customRequest={dummyUploadRequest}
                listType="picture"
                fileList={uploadedImages}
                className="upload-list-inline"
                onChange={handleNewImageUpload}
                onPreview={handlePreview}
                multiple
                maxCount={4}
            >
                <div>
                    <PlusOutlined /> <br/>
                    <div style={{ marginTop: 8 }}>{uploadText || 'Suba una imagen'}</div>
                </div>
            </Upload>
            <Divider style={{ borderWidth: 2}} />
            <Modal visible={showPreview} onOk={() => setShowPreview(false)} onCancel={() => setShowPreview(false)}>
                <img src={previewImage} width="100%"/>
            </Modal>
        </>
    )
}

export default PhotoList;