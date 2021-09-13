import { DatePicker, Form} from 'antd';
import { ReactElement } from 'react';
import {Moment} from 'moment';
import moment from 'moment';

interface DateInputProps {
    id: string;
    valueUnixTime: number | null;
    label: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    errorMessage?: string,
    validRange?: [Moment, Moment]
    onlyWorkingDays?: boolean;
    disabled?: boolean;
    onlyFutureDates?: boolean;
}

const DateInput = ({
    id,
    label,
    valueUnixTime,
    required,
    onChange,
    validRange,
    onlyWorkingDays,
    disabled,
    onlyFutureDates
}: DateInputProps): ReactElement => {

    const checkDisabledDates = (date: Moment) => {
        date = date.seconds(0).milliseconds(0);
        const weekDay = date.weekday()
        if (onlyWorkingDays && (weekDay === 5 || weekDay === 6)) {
            return true
        };
        if (onlyFutureDates && date < moment()) {return true}
        if (!validRange) {return false};
        if (date < validRange[0]) {return true};
        if (date > validRange[1]) {return true};
        return false;
    }

    return (
        <Form.Item
            id={id}
            label={label}
            rules={[{ required, message: `${label} es requerido` }]}
        >
            <DatePicker
                defaultValue={!!valueUnixTime ? moment(valueUnixTime*1000) :  undefined}
                onChange={(date) => onChange(id, date?.seconds(0).milliseconds(0).unix())} 
                disabledDate={checkDisabledDates}
                disabled={disabled}
            />
        </Form.Item>
    );
}

export default DateInput