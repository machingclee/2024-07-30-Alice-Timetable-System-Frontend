import { TextField } from "@mui/material";
import { Property } from "csstype";
import { useRef } from "react";

const UpdateTextField = (props: {
    fontSize?: Property.FontSize<string | number>;
    style?: React.CSSProperties;
    defaultValue: string;
    placeholder?: string;
    onChange: (t: string) => void;
}) => {
    const { defaultValue, onChange } = props;
    const ref = useRef<HTMLInputElement>(null);
    // Function to select the text when the input is focused
    const handleFocus = () => {
        if (ref.current) {
            ref.current.select();
        }
    };

    // Merge the styles using the spread operator
    const combinedStyle: React.CSSProperties = {
        width: 1000,
        ...props.style,
    };
    return (
        <TextField
            inputRef={ref}
            InputProps={{
                style: {
                    fontSize: props.fontSize ? props.fontSize : "16px",
                },
            }}
            onClick={handleFocus}
            id="standard-basic"
            variant="standard"
            placeholder={props.placeholder}
            style={combinedStyle}
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default UpdateTextField;
