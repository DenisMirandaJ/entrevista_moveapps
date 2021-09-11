import { Calendar, Form } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import moment from "moment";
import { ReactElement } from "react";
import { FormState } from "../../hooks/useFormState";
import { RepairDateSelectorFormData } from "../../utils/formUtils/CalendarUtils";
import DateInput from "../Inputs/DateInput";

interface RepairDateSelectorProps {
    formState: FormState<RepairDateSelectorFormData>
}

const RepairDateSelector = ({
    formState
}: RepairDateSelectorProps): ReactElement => {
    const {startDate, endDate} = formState.value
    const breakPoint = useBreakpoint();

    let validDateRange: [moment.Moment, moment.Moment] | undefined = undefined;
    let validCalendarRange: [moment.Moment, moment.Moment] | undefined = undefined;
    if (startDate) {
        validDateRange = [moment(startDate*1000).add(7, 'days'), moment(startDate*1000).add(67, 'days')]
        validCalendarRange = [moment(startDate*1000), moment(startDate*1000).add(67, 'days')]
    }
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
                <DateInput id="startDate" label="Fecha entrega" onChange={formState.handleFieldChange} onlyWorkingDays />
                <DateInput id="endDate" label="Fecha retorno" onChange={formState.handleFieldChange} validRange={validDateRange} onlyWorkingDays disabled={startDate ? false : true}/>
            </Form>
            <Calendar 
                value={startDate? moment(startDate*1000): moment()}
                fullscreen={breakPoint.sm || breakPoint.md}  
                dateCellRender={datesHighlighter}
                validRange={validCalendarRange}
            />
        </>
    )
}

export default RepairDateSelector;