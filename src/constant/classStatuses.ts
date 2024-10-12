import { Class_status } from "../prismaTypes/types";


const classStatues: {
    value: Class_status, label: Class_status
}[] = [
        { value: "PRESENT", label: "PRESENT" },
        { value: "MAKEUP", label: "MAKEUP" },
        { value: "SUSPICIOUS_ABSENCE", label: "SUSPICIOUS_ABSENCE" },
        { value: "ILLEGIT_ABSENCE", label: "ILLEGIT_ABSENCE" },
        { value: "LEGIT_ABSENCE", label: "LEGIT_ABSENCE" },
    ];


export default classStatues