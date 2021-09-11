import { DatePicker, Form} from 'antd';
import { ReactElement } from 'react';

interface DateInputProps {
    id: string;
    label: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    errorMessage?: string
}

const DateInput = ({
    id,
    label,
    required,
    onChange,
}: DateInputProps): ReactElement => {
    return (
        <Form.Item
            id={id}
            label={label}
            rules={[{ required, message: `${label} es requerido` }]}
        >
            <DatePicker onChange={(date) => onChange(id, date?.unix())} />
        </Form.Item>
    );
}

export default DateInput