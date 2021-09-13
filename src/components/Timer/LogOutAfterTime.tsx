import { Modal } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router";

interface LogOutAfterTimeProps {
    time: number;
}

export const LogOutAfterTime = ({time}: LogOutAfterTimeProps): ReactElement => {
    const history = useHistory();
    const [timeToLogOf, setTimeToLogOf] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            localStorage.clear();
            setTimeToLogOf(true);
        }, time)
    }, []);

    return (
        <Modal title="Time's out!" visible={timeToLogOf} onOk={() => history.push('/')} onCancel={() => history.push('/')}>
            <p>Se ha agotado el tiempo disponible en la sesión, deberá ingresar nuevamente</p>
        </Modal>
    )
}