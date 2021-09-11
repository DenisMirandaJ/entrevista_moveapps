
export interface UserInfoFormData {
    firstname: string;
    lastname: string;
    rut: string;
    address: string;
    comuna: string;
    email: string;
    sex: string;
    birthDate: Date | null
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
        birthDate: null,
    }
}