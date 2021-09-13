import { Form, Select} from 'antd';
import { ReactElement } from 'react';
const { Option } = Select;

interface SelectInputProps {
    id: string;
    options: string[];
    value?: string;
    label: string;
    placeholder: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    errorMessage?: string;
    disabled?: boolean;
}

const SelectInput = ({
    id,
    options,
    value,
    label,
    placeholder,
    required,
    onChange,
    disabled
}: SelectInputProps): ReactElement => {
    return (
        <Form.Item
            id={id}
            label={label}
            name={label}
            rules={[{ required, message: `${label} es requerido` }]}
        >
            <Select disabled={disabled} value={value} defaultValue={value} placeholder={placeholder} onChange={(option: string) => onChange(id, option)}>
                {
                    options.map(option =>
                        <Option key={option} value={option}>{option}</Option>
                    )
                }
            </Select>
        </Form.Item>
    );
}

export default SelectInput