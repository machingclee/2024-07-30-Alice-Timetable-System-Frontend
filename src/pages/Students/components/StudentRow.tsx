import { Box, Button } from '@mui/material';
import boxShadow from '../../../constant/boxShadow';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import EditStudentDialog from './EditStudentDialog';
import EditStudentForm from './EditStudentForm';
import RouteEnum from '../../../enum/RouteEnum';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../redux/hooks';

export default function StudenRow(props: { studentId: string }) {
    const { studentId } = props;
    const student = useAppSelector(s => s.student.students.idToStudent?.[studentId]);
    const navigate = useNavigate();

    const goDetailPage = () => {
        navigate(`${RouteEnum.DASHBOARD_STUDENTS}/${studentId}`);
    };
    const contextMenuId = studentId;

    if (!student) {
        return null;
    }
    const {
        studentCode = '',
        firstName = '',
        parentEmail = '',
        lastName = '',
        chineseFirstName = '',
        chineseLastName = '',
        gender = '',
        birthdate = '',
        grade = '',
        schoolName = '',
        phoneNumber = '',
        wechatId = '',
    } = student;

    const chineseName = (() => {
        let name = '';
        if (chineseLastName) {
            name += chineseLastName;
        }
        if (chineseFirstName) {
            name += chineseFirstName;
        }
        return name;
    })();

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box
                style={{
                    flex: 1,
                    boxShadow: boxShadow.SHADOW_62,
                    padding: '20px 30px',
                    marginBottom: '15px',
                    borderRadius: '0px',
                }}
                sx={{
                    backgroundColor: 'white',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& input': {
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        flex: 1,
                        padding: '1.4px',
                        border: 'none',
                        outline: 'none',
                    },
                    '& td': {
                        marginBottom: '4px',
                    },
                    '& td:nth-child(1)': {
                        verticalAlign: 'top',
                        width: '120px',
                        color: 'rgb(150,150,150)',
                    },
                    '& td:nth-child(2), & td:nth-child(3)': {
                        display: 'flex',
                        width: '300px',
                        minHeight: '16px',

                        borderRadius: '4px',
                        background: 'rgb(240,240,240)',
                        padding: '5px',
                    },
                }}
            >
                {/* @ts-expect-error - context menu has probleming in typing */}
                <ContextMenuTrigger id={contextMenuId}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>Student Code:</td>
                                    <td>{studentCode}</td>
                                </tr>
                                <tr>
                                    <td>Chinese Name:</td>
                                    <td>{chineseName}</td>
                                </tr>
                                <tr>
                                    <td>English Name:</td>
                                    <td>{`${firstName} ${lastName}`}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{`${gender}`}</td>
                                </tr>
                                <tr>
                                    <td>School Name:</td>
                                    <td>{`${schoolName}`}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Grade:{' '}
                                        <span
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                            }}
                                        >{`(before ${dayjs(new Date()).format('YYYY')}-09-01)`}</span>
                                    </td>
                                    <td>{`${grade}`}</td>
                                </tr>
                                <tr>
                                    <td>phone number:</td>
                                    <td>{`${phoneNumber}`}</td>
                                </tr>
                                <tr>
                                    <td>Wechat ID:</td>
                                    <td>{`${wechatId || ''}`}</td>
                                </tr>
                                <tr>
                                    <td>Parent Email:</td>
                                    <td>{parentEmail}</td>
                                </tr>
                                <tr>
                                    <td>Birthday:</td>
                                    <td>{`${birthdate}`}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            TouchRippleProps={{
                                style: {
                                    color: 'rgba(0,0,0,0.5)',
                                },
                            }}
                            onClick={goDetailPage}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        />
                    </div>
                </ContextMenuTrigger>
                <FaChevronRight size={26} color="rgb(100,100,100)" />
            </Box>
            {/* @ts-expect-error - context menu has probleming in typing */}
            <ContextMenu id={contextMenuId} style={{ zIndex: 10 ** 7 }}>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: boxShadow.SHADOW_62,
                        '& .menu-item': {
                            padding: '10px',
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'rgb(64, 150, 255)',
                            },
                            '&.disabled': {
                                opacity: 0.3,
                                pointerEvents: 'none',
                            },
                        },
                    }}
                >
                    {/* @ts-expect-error - context menu has probleming in typing */}
                    <MenuItem
                        className="menu-item"
                        onClick={() => {
                            EditStudentDialog.setWidth('sm');
                            EditStudentDialog.setContent(() => () => <EditStudentForm studentId={student.id} />);
                            EditStudentDialog.setOpen(true);
                        }}
                    >
                        Edit Student
                    </MenuItem>
                    {/* <MenuItem
                        className="menu-item"
                        onClick={() => {
                            DeleteStudentDialog.setContent(() => () => <DeleteStudentForm studentId={student.id} />);
                            DeleteStudentDialog.setOpen(true);
                        }}
                    >
                        <span style={{ color: "red" }}>Delete Student</span>
                    </MenuItem> */}
                </Box>
            </ContextMenu>
        </div>
    );
}
