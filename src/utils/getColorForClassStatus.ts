import colors from "../constant/colors";
import { Class_status } from "../prismaTypes/types";

export default (class_status: Class_status) => {
    switch (class_status) {
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
    }
};
