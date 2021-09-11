import { Form, Select} from 'antd';
import { ReactElement } from 'react';
const { Option } = Select;

interface SelectInputProps {
    id: string;
    options: string[];
    defaultValue?: string;
    label: string;
    placeholder: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    errorMessage?: string
}

const SelectInput = ({
    id,
    options,
    defaultValue,
    label,
    placeholder,
    required,
    onChange,
}: SelectInputProps): ReactElement => {
    return (
        <Form.Item
            id={id}
            label={label}
            name={label}
            rules={[{ required, message: `${label} es requerido` }]}
        >
            <Select defaultValue={defaultValue} placeholder={placeholder} onChange={(option: string) => onChange(id, option)}>
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