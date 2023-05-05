import { Button } from "@mui/material";
import { Edit, Delete, Check } from "@mui/icons-material";

interface ICustomButtonProps {
    variant: "edit" | "delete" | "select";
    onClick: () => void;
    text: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    variant,
    onClick,
    text,
}) => {
    let buttonIcon;
    let buttonColor: any;

    switch (variant) {
        case "edit":
            buttonIcon = <Edit />;
            buttonColor = "warning";
            break;
        case "delete":
            buttonIcon = <Delete />;
            buttonColor = "error";
            break;
        case "select":
            buttonIcon = <Check />;
            buttonColor = "secondary";
            break;
    }

    return (
        <Button
            variant="contained"
            color={buttonColor}
            sx={{ mx: 3 }}
            onClick={onClick}
        >
            {buttonIcon}
            {text}
        </Button>
    );
};

export default CustomButton;
