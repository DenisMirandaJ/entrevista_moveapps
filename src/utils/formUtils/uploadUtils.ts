import { UploadFile } from "antd/lib/upload/interface";

//Needed to override default Ant's Upload component behaviour (Taken from https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it)
export const dummyUploadRequest = (reqOptions: any) => {
    setTimeout(() => {
        reqOptions.onSuccess("ok");
    }, 0);
    };