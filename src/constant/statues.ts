import colors from './colors';

const statues = {
    present: {
        text: 'Present',
        color: colors.GREEN_BLUE,
    },
    reserved: {
        text: 'Reserved',
        color: colors.CYAN,
    },
    suspicious_absence: {
        text: 'Suspicious Absence',
        color: colors.ORANGE,
    },
    illegit_absence: {
        text: 'Illegit Absence',
        color: colors.RED,
    },
    legit_absence: {
        text: 'Legit Absence',
        color: colors.GREY,
    },
    makeup: {
        text: 'Makeup',
        color: colors.BLUE,
    },
    trial: {
        text: 'Trial',
        color: colors.PINK,
    },
    changeOfClassroom: {
        text: 'Change of Classroom',
        color: colors.PURPLE,
    },
};

export default statues;
