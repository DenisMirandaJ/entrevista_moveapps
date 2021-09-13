import jwt from 'jsonwebtoken';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { mockPrivateKey } from '../../requests/loginRequest';
import { sleep } from '../../requests/VehicleRepairFormRequests';
import { LogOutAfterTime } from '../Timer/LogOutAfterTime';
import Login from '../login/Login';
import VehicleRepairForm from '../VehicleRepairForm/VehicleRepairForm';

const mockCheckifLoggedIn = async (token: string | null) => {
    await sleep(500);
    try {
        if (!token) {
            return false
        }
        jwt.verify(token, mockPrivateKey);
        return true;
    } catch (error) {
        return false;
    }
}

const FormAuth = (): ReactElement => {
    const token = localStorage.getItem('jwt');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const history = useHistory();
    
    useEffect(() => {
        const checkAuth =  async () => {
            const isLogged = await mockCheckifLoggedIn(token);
            if (!isLogged) {
                history.push('/')
            }
            setIsLoggedIn(isLogged);
        }
        checkAuth();
    })


    return (
        <div>
            {isLoggedIn? <VehicleRepairForm /> : <Login />}
            <LogOutAfterTime time={15*60*1000} />
        </div>
    );
    }

export default FormAuth;