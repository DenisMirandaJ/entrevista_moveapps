
export interface UserInfoFormData {
    firstname: string;
    lastname: string;
    rut: string;
    address: string;
    comuna: string;
    email: string;
    sex: string;
    age: string | number;
}

export const getEmptyUserInfoForm = (): UserInfoFormData => {
    return {
        firstname: '',
        lastname: '',
        rut: '',
        address: '',
        comuna: '',
        email: '',
        sex: '',
        age: '',
    }
}