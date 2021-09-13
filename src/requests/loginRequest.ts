import jwt from 'jsonwebtoken';
import { sleep } from './VehicleRepairFormRequests';

export const mockPrivateKey = "#$1DA#r2dqwQ23fdcFGwR#";
const mockMail = 'mail@mail.com'
const mockPassword = "1234"


export const loginRequest = async (mail: string, password: string): Promise<string> => {
    await sleep(1000);
    if (mail !== mockMail || password !== mockPassword) {
        throw new Error("Bad credentials!!");
    }
    const jwtOptions = {
        expiresIn: 15*1000,
        subject: mail,
    }
    const userToken = jwt.sign({user: mail}, mockPrivateKey, jwtOptions)
    return userToken;
}