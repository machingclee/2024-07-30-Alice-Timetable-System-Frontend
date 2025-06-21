import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import EditStudentDialog from './EditStudentDialog';
import EditStudentForm from './EditStudentForm';
import RouteEnum from '../../../enum/RouteEnum';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { AliceMenu } from '@/components/AliceMenu';
import { IoLogoOctocat } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';
import { studentsApi } from '../../../redux/slices/studentSlice';

export default function StudentRow(props: { studentId: string }) {
    const { studentId } = props;
    const { student } = studentsApi.endpoints.getStudents.useQuery(undefined, {
        selectFromResult: ({ data }) => {
            return { student: data?.studentIdToStudent?.[studentId] };
        },
    });

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
                className="rounded-md border-1 shadow-sm border-teal-400 cursor-pointer"
                style={{
                    flex: 1,
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
                    '& td:nth-child(3)': {
                        paddingLeft: '20px',
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
                        className="flex flex-col"
                        style={{
                            padding: '0px 0px',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div className="w-full bg-emerald-50">
                            <div className="flex justify-start items-center text-xl pl-4 pt-1 pb-0.5 shadow-gray-300 gap-2">
                                <IoLogoOctocat />
                                <div>{`${firstName} ${lastName}`}</div>
                            </div>
                        </div>
                        <Separator className="bg-emerald-200 -mt-2" />

                        <div className="flex justify-between w-full pl-2 pb-2 pr-2 pt-2">
                            <div>
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
                                                <td>Birthday:</td>
                                                <td>{`${dayjs(birthdate).format('YYYY-MM-DD')}`}</td>
                                                <td>Parent Phone:</td>
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
                                                <td></td>
                                                <td style={{ background: 'none' }}></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaChevronRight size={26} color="rgb(100,100,100)" />
                            </div>
                        </div>
                    </Button>
                </AliceMenu>
            </Box>
        </div>
    );
}
