import { DatePicker, Form} from 'antd';
import { ReactElement } from 'react';
import {Moment} from 'moment';

interface DateInputProps {
    id: string;
    label: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    errorMessage?: string,
    validRange?: [Moment, Moment]
    onlyWorkingDays?: boolean;
    disabled?: boolean;
}

const DateInput = ({
    id,
    label,
    required,
    onChange,
    validRange,
    onlyWorkingDays,
    disabled
}: DateInputProps): ReactElement => {

    const checkDisabledDates = (date: Moment) => {
        const weekDay = date.weekday()
        if (onlyWorkingDays && (weekDay === 5 || weekDay === 6)) {
            return true
        };
        if (!validRange) return false;
        if (date < validRange[0]) return true;
        if (date > validRange[1]) return true;
        return false;
    }

    return (
        <Form.Item
            id={id}
            label={label}
            rules={[{ required, message: `${label} es requerido` }]}
        >
            <DatePicker 
                onChange={(date) => onChange(id, date?.seconds(0).milliseconds(0).unix())} 
                disabledDate={checkDisabledDates}
                disabled={disabled}
            />
        </Form.Item>
    );
}

export default DateInput