import { Box } from '@mui/material';
import boxShadow from '../../../constant/boxShadow';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import EditStudentDialog from './EditStudentDialog';
import EditStudentForm from './EditStudentForm';
import RouteEnum from '../../../enum/RouteEnum';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../redux/hooks';
import { Button } from 'antd';
import { AliceMenu } from '@/components/AliceMenu';

export default function StudenRow(props: { studentId: string }) {
    const { studentId } = props;
    const student = useAppSelector(s => s.student.students.idToStudent?.[studentId]);
    const navigate = useNavigate();

    const goDetailPage = () => {
        navigate(`${RouteEnum.DASHBOARD_STUDENTS}/${studentId}`);
    };

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
                    margin: '7px 15px',
                    borderRadius: '20px',
                    overflow: 'hidden',
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
                    '& td:nth-child(1), & td:nth-child(3)': {
                        verticalAlign: 'top',
                        textAlign: 'left',
                        width: '120px',
                        color: 'rgb(150,150,150)',
                        paddingRight: '10px',
                        paddingLeft: '10px',
                    },
                    '& .react-contextmenu-wrapper': {
                        width: '100%',
                    },
                    '& td:nth-child(2), & td:nth-child(4)': {
                        display: 'flex',
                        width: '260px',
                        minHeight: '16px',
                        borderRadius: '4px',
                        background: 'rgb(0,0,0,0.08)',
                        padding: '5px',
                    },
                    '& td:nth-child(5)': {
                        width: '100%',
                    },
                }}
            >
                <AliceMenu
                    items={[
                        {
                            item: 'Edit Student',
                            onClick: () => {
                                EditStudentDialog.setWidth('sm');
                                EditStudentDialog.setContent(() => () => <EditStudentForm studentId={student.id} />);
                                EditStudentDialog.setOpen(true);
                            },
                        },
                    ]}
                >
                    <Button
                        type="text"
                        onClick={goDetailPage}
                        style={{
                            padding: '10px 20px',
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>Student Code:</td>
                                        <td>{studentCode}</td>
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
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Chinese Name:</td>
                                        <td>{chineseName}</td>
                                        <td>School Name:</td>
                                        <td>{`${schoolName}`}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>English Name:</td>
                                        <td>{`${firstName} ${lastName}`}</td>
                                        <td>phone number:</td>
                                        <td>{`${phoneNumber}`}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Gender:</td>
                                        <td>{`${gender}`}</td>
                                        <td>Wechat ID:</td>
                                        <td
                                            style={{ backgroundColor: wechatId ? 'inherit' : 'transparent' }}
                                        >{`${wechatId || ''}`}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Parent Email:</td>
                                        <td>{parentEmail}</td>
                                        <td>Birthday:</td>
                                        <td>{`${birthdate}`}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <FaChevronRight size={26} color="rgb(100,100,100)" />
                    </Button>
                </AliceMenu>
            </Box>
        </div>
    );
}
