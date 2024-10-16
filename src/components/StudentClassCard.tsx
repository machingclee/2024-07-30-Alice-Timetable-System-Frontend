import { useState } from "react";
import { TimetableClass } from "../dto/dto";
import { Box } from "@mui/material";
import colors from "../constant/colors";
import boxShadow from "../constant/boxShadow";

export default (props: {
    classEvent: TimetableClass,
    dayUnixTimestamp: number,
    currHourUnixTimestamp: number,
}) => {
    const { classEvent, currHourUnixTimestamp, dayUnixTimestamp } = props
    const [classEventHeight, setClassEventHeight] = useState<number | null>(null);
    const invalidData = dayUnixTimestamp >= currHourUnixTimestamp;
    const { first_name, last_name, chinese_first_name, chinese_last_name } = classEvent;
    const engName = `${last_name} ${first_name}`;
    const chiName = chinese_first_name && chinese_last_name ? `${chinese_first_name}${chinese_last_name}` : ""
    return (
        <Box
            onMouseEnter={() => {
                setClassEventHeight(120);
            }}
            onMouseLeave={() => {
                setClassEventHeight(null);
            }}

            style={{
                cursor: "pointer",
                border: "1px solid #357fd9",
                margin: "5px",
                boxShadow: boxShadow.SHADOW_62,
                minHeight: "50px",
                transition: "height 0.18s ease-in-out",
                zIndex: classEventHeight ? 10 ** 7 : 10 ** 5,
                overflow: "hidden",
                maxWidth: 150,
                width: 150,
                height: classEventHeight || 1.2 * (classEvent.min || 0) - 10,
                backgroundColor: (() => {
                    if (invalidData) {
                        return "red";
                    } else {
                        switch (classEvent.class_status) {
                            case "PRESENT":
                                return colors.blue;
                            case "SUSPICIOUS_ABSENCE":
                                return colors.amber;
                            case "ILLEGIT_ABSENCE":
                                return colors.red;
                            case "LEGIT_ABSENCE":
                                return colors.grey;
                            case "MAKEUP":
                                return colors.green;
                            case "CHANGE_OF_CLASSROOM":
                                return colors.purple;
                        }
                    }
                })(),
                borderRadius: 4,
                fontSize: 14,
                color: "white",
                textAlign: "center",
            }}
        >
            <div style={{ padding: 4 }}>{classEvent.course_name}</div>
            <div style={{ padding: 4 }}>{engName}</div>
            {chiName && <div style={{ padding: 4 }}>{chiName}</div>}
        </Box>
    )
}