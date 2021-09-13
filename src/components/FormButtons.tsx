import { Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { ReactElement } from "react";

interface FormButtonsProps {
    onForwardButtonClick?: () => void;
    onBackButtonClick: () => void;
    isFinal?: boolean;
    disabled?: boolean;
}

const FormButtons = ({
    onForwardButtonClick,
    onBackButtonClick,
    isFinal,
    disabled
}: FormButtonsProps): ReactElement => {
    if (disabled) {
        return <></>;
    }
    return (
    <>
        <FormItem>
            <Button type="primary" htmlType="submit" onClick={onForwardButtonClick? onForwardButtonClick : undefined} block>
                {isFinal ? 'Terminar formulario' : "Siguiente ->"}
            </Button>

            <Button type="default" onClick={onBackButtonClick} block>
                {"<-"} Volver atras
            </Button>
        </FormItem>
    </>)
}

export default FormButtons;