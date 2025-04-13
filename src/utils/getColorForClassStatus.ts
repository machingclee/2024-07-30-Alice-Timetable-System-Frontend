import { Class_status } from '@/dto/kotlinDto';
import colors from '../constant/colors';

export default (class_status: Class_status) => {
    switch (class_status) {
        case 'PRESENT':
            return colors.GREEN_BLUE;
        case 'TRIAL':
            return colors.PINK;
        case 'SUSPICIOUS_ABSENCE':
            return colors.ORANGE;
        case 'ILLEGIT_ABSENCE':
            return colors.RED;
        case 'LEGIT_ABSENCE':
            return colors.GREY;
        case 'MAKEUP':
            return colors.BLUE;
        case 'RESERVED':
            return colors.CYAN;
        case 'BAD_WHETHER':
            return colors.BLACK;
    }
};
