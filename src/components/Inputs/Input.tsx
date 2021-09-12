import { Form, Input as AntdInput} from 'antd';
import { Rule } from 'antd/lib/form';
import { ReactElement } from 'react';

interface InputProps {
    id: string;
    value: string | number;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    onChange(fieldName: string, value: unknown): void;
    rules?: Rule[]
}

const Input = ({
    id,
    value,
    label,
    type,
    placeholder,
    required,
    onChange,
    rules
}: InputProps): ReactElement => {

    if (!rules) {rules = []};

    return (
        <Form.Item
            label={label}
            name={id}
            rules={[...rules, { required, message: `${label} es requerido` }]}
        >
            <AntdInput defaultValue={value} value={value} type={type} placeholder={placeholder} onChange={(e) => onChange(id, e.target.value)}/>
        </Form.Item>
    );
}

export default Input