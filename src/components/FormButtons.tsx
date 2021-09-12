import { Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { ReactElement } from "react";

interface FormButtonsProps {
    onForwardButtonClick: () => void;
    onBackButtonClick: () => void;
    isFinal?: boolean;
}

const FormButtons = ({
    onForwardButtonClick,
    onBackButtonClick,
    isFinal,
}: FormButtonsProps): ReactElement => {
    return (
    <>
        <FormItem>
            <Button type="primary" htmlType="submit" onClick={onForwardButtonClick} block>
                {isFinal ? 'Terminar formulario' : "Siguiente ->"}
            </Button>

            <Button type="default" htmlType="submit" onClick={onBackButtonClick} block>
                {"<-"} Volver atras
            </Button>
        </FormItem>
    </>)
}

export default FormButtons;