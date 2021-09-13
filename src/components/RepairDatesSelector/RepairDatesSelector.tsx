import { Calendar, Form, message } from "antd";
import moment, {Moment} from "moment";
import { ReactElement, useEffect, useState } from "react";
import FormButtons from "../FormButtons";
import DateInput from "../Inputs/DateInput";

interface RepairDateSelectorProps {
    formState: calendarStateManager,
    onFinish: () => void;
    onBackStep: () => void;
    readOnly?: boolean;
}

type calendarStateManager = [{
    startDate: number | null;
    endDate: number | null;
}, React.Dispatch<React.SetStateAction<{
    startDate: number | null;
    endDate: number | null;
}>>];

const RepairDateSelector = ({
    formState,
    onFinish,
    onBackStep,
    readOnly,
}: RepairDateSelectorProps): ReactElement => {
    const {startDate, endDate} = formState[0];
    const [validDateRange, setValidDateRange] = useState<[Moment, Moment]>([moment(), moment().add(60, 'days')]);
    const [validCalendarRange, setValidCalendarRange] = useState<[Moment, Moment]>([moment(), moment().add(60, 'days')]);

    //Calcula el siguiente dia habil mas cercano en que se puede recoger el auto
    useEffect(() => {
        let minimunWaitTimeAux = 0;
        if (startDate) {
            //Calculate mininum endDate
            const startDateObject = moment(startDate*1000)
            while (minimunWaitTimeAux < 7) {
                const startDateObjectWeekDay = startDateObject.weekday();
                //If working day
                if (startDateObjectWeekDay < 5) {
                    minimunWaitTimeAux = minimunWaitTimeAux + 1;
                }
                startDateObject.add(1, 'days')
            }
    
            setValidDateRange([moment(startDate*1000).add(minimunWaitTimeAux, 'days'), moment(startDate*1000).add(67, 'days')])
            setValidCalendarRange([moment(startDate*1000), moment(startDate*1000).add(67, 'days')])
        }
    }, [startDate])

    const getFormErrors = (): string[] => {
        const errors: string[] = []
        if (!startDate || !endDate) {
            errors.push('Debe ingresar ambas fechas');
            return errors;
        }
        return [];
    }

    const  onSubmit = (direction: 'forward' | 'back' = 'forward') => { 
        const errors = getFormErrors();
        if (errors.length > 0) {
            message.error(errors[0])
            return;
        }
        direction === 'forward' ? onFinish() : onBackStep();
    }


    //Marca en el calendario la fecha actual, fecha de entrega y fecha de retorno del vehiculo ademas de los dias no habiles
    const datesHighlighter = (date: moment.Moment): ReactElement => {
        if (date.seconds(0).milliseconds(0).unix() === startDate) {
            return (
                <b>Entrega</b>
            );
        }
        if (date.seconds(0).milliseconds(0).unix() === endDate) {
            return <b>Retorno</b>
        }
        if (date.seconds(0).milliseconds(0).unix() === moment().seconds(0).milliseconds(0).unix()) {
            return <b>Hoy</b>
        }
        if (date.weekday() === 5 || date.weekday() === 6) {
            return <b>FDS</b>
        }
        return <></>;
      }

    return (
        <>
            <Form layout="inline">
                <DateInput 
                    id="startDate" 
                    label="Fecha entrega" 
                    valueUnixTime={startDate}
                    onChange={(fieldName, value) => formState[1]({'endDate': endDate, startDate: value as number})} 
                    onlyWorkingDays 
                    onlyFutureDates
                    disabled={readOnly}
                />
                <DateInput 
                    id="endDate" 
                    label="Fecha retorno"
                    valueUnixTime={endDate}
                    onChange={(fieldName, value) => formState[1]({'startDate': startDate, endDate: value as number})} 
                    validRange={validDateRange} 
                    onlyWorkingDays 
                    disabled={(startDate? false : true) || readOnly}
                />
            </Form>
            <Calendar 
                value={startDate? moment(startDate*1000): moment()}
                fullscreen={false}
                dateCellRender={datesHighlighter}
                validRange={validCalendarRange}
            />
            <FormButtons isFinal disabled={readOnly} onForwardButtonClick={() => onSubmit('forward')} onBackButtonClick={() => onSubmit('back')} />
        </>
    )
}

export default RepairDateSelector;