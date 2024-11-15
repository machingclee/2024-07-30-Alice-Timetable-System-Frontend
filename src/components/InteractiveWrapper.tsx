import { IconButton } from "@mui/material";
import { ReactNode } from "react";

export default ({ onClick, children }: { onClick?: () => void; children: ReactNode }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                transition: "background-color 0.3s ease, transform 0.5 ease-in-out",
                "&:hover": {
                    backgroundColor: "rgb(246,250,253)",
                    transform: "scale(1.1)",
                },
            }}
        >
            {children}
        </IconButton>
    );
};
