import colors from "../constant/colors";
import { Class_status } from "../prismaTypes/types";

export default (class_status: Class_status) => {
    switch (class_status) {
        case "PRESENT":
            return colors.greenBlue;
        case "TRIAL":
            return colors.pink;
        case "SUSPICIOUS_ABSENCE":
            return colors.orange;
        case "ILLEGIT_ABSENCE":
            return colors.red;
        case "LEGIT_ABSENCE":
            return colors.grey;
        case "MAKEUP":
            return colors.blue;
        case "TRIAL":
            return colors.blue;
        case "RESERVED":
            return colors.cyan;
    }
};
