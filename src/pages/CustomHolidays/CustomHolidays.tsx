import AliceModalTrigger, { AliceModalProps } from '@/components/AliceModalTrigger';
import FormInputField from '@/components/FormInputField';
import SectionTitle from '@/components/SectionTitle';
import Spacer from '@/components/Spacer';
import { Button, Calendar } from 'antd';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { useState } from 'react';
import { MdOutlineEventBusy } from 'react-icons/md';
import FormInputTitle from '@/components/FormInputTitle';
import useCustomHolidaysQuery from '@/reactQueries/query/useCustomHolidaysQuery';
import useCreateHolidayMutation from '@/reactQueries/mutation/useCreateHolidayMutation';
import { Box } from '@mui/material';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/reactQueries/query/queryKeys';
import apiClient from '@/axios/apiClient';
import { UpodateHolidayDTO } from '@/dto/dto';
import apiRoutes from '@/axios/apiRoutes';
import { CustomResponse } from '@/axios/responseTypes';
import { useAppDispatch } from '@/redux/hooks';
import appSlice from '@/redux/slices/appSlice';
import clsx from 'clsx';

const CALENDAR_IS_TODAY_COLOR = '#3bc289';

export const CalendarCell = (props: { className: string; date: dayjs.Dayjs }) => {
    const { className, date } = props;
    return (
        <div className="w-full h-full flex items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
            <div className={className}>{date.date()}</div>
        </div>
    );
};

export const HIGHLIGHT_CALEDAR_DATE_STYLE = clsx(
    'w-7 h-7 bg-emerald-200 rounded-md flex items-center justify-center font-semibold text-emerald-700'
);

export default function CustomHolidays() {
    const customHolidaysQuery = useCustomHolidaysQuery();

    return (
        <div className="space-y-4">
            <SectionTitle>Custom Holidays</SectionTitle>

            <AliceModalTrigger modalContent={AddHolidayModal}>
                <Button type="primary" className="cursor-pointer">
                    Add Holiday
                </Button>
            </AliceModalTrigger>
            <div className="flex gap-4">
                <div className="flex-1">
                    <div className="space-y-2.5 pr-4">
                        {customHolidaysQuery.data?.map(holiday => {
                            const { id, desc, name, startOfTheDate } = holiday;
                            return <Holiday holidayId={id} name={name} date={startOfTheDate} desc={desc} />;
                        })}
                    </div>
                </div>
                <div className="w-[320px]">
                    <Box
                        sx={{
                            '& .ant-picker-calendar-date-value': {
                                display: 'none',
                            },
                            '& .ant-picker-cell-inner::before': {
                                border: 'none !important',
                            },
                            '& .ant-picker-cell-inner': {
                                backgroundColor: 'transparent !important',
                            },
                        }}
                    >
                        <div className="p-2 rounded-lg shadow-xl w-full border border-emerald-400 bg-teal-100 space-y-2">
                            <div className="flex items-center ml-1 gap-2">
                                <BsCalendar2MonthFill />
                                Calendar
                            </div>
                            <Calendar
                                className="border-1 !border-teal-300 !rounded-sm"
                                fullscreen={false}
                                value={dayjs()}
                                cellRender={date => {
                                    const className = determineStyle(date);
                                    return <CalendarCell className={className} date={date} />;
                                }}
                            />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );

    function determineStyle(date: dayjs.Dayjs) {
        const isToday = date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
        const isHoliday = customHolidaysQuery.data?.some(
            holiday => dayjs(holiday.startOfTheDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        );
        const className = clsx({
            [clsx(HIGHLIGHT_CALEDAR_DATE_STYLE, `!bg-[${CALENDAR_IS_TODAY_COLOR}] text-white`)]: isToday,
            [HIGHLIGHT_CALEDAR_DATE_STYLE]: !isToday && isHoliday,
            ['text-gray-700']: !isToday && !isHoliday,
        });
        return className;
    }
}

const AddHolidayModal = (props: AliceModalProps) => {
    const { setOkText, setOnOk, setOpen } = props;
    setOkText('Confirm');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    setOnOk(() => {
        console.log(name, desc);
    });

    const createHoliday = useCreateHolidayMutation({
        date,
        desc,
        name,
        onSuccess: () => {
            setOpen(false);
        },
    });

    setOnOk(createHoliday.mutate);

    return (
        <div>
            <SectionTitle>Add Custom Holiday</SectionTitle>
            <Spacer />
            <FormInputField title="Holiday Name" onChange={t => setName(t)} />
            <FormInputField title="Holiday Description" onChange={t => setDesc(t)} />

            <FormInputTitle>Select a Date</FormInputTitle>
            <DatePicker value={date} onChange={date => setDate(date)} />
            <Spacer />
        </div>
    );
};

function Holiday(props: { date: number; name: string; desc: string; holidayId: number }) {
    const { holidayId, date, desc, name } = props;
    return (
        <div
            key={date}
            className="overflow-hidden bg-white p- rounded-lg shadow-sm hover:shadow-md transition-shadow border border-emerald-400"
        >
            <div className="bg-emerald-50 border-b-[1px] border-emerald-200 w-full py-1 px-2 text-lg flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <MdOutlineEventBusy className="text-2xl" />
                    {name}
                </div>
                <div>
                    <AliceModalTrigger
                        destroyOnClose={false}
                        modalContent={EditHolidayModal}
                        context={{
                            holidayId,
                            date,
                            desc,
                            name,
                        }}
                    >
                        <Button className="!bg-teal-200 hover:bg-emerald-700 !px-7 !rounded-[4px]">Edit</Button>
                    </AliceModalTrigger>
                </div>
            </div>
            <div className="pt-2 px-4 rounded-lg">
                <div className="space-y-0.5">
                    <div>
                        <table className="w-full [&>tbody>tr>td]:pb-2">
                            <tbody>
                                <tr>
                                    <td className="font-medium text-gray-600 w-[60px]">
                                        <div className="flex">
                                            <div className="bg-gray-100 py-0.5 px-2 rounded-md text-2xs">Date</div>
                                        </div>
                                    </td>
                                    <td className="font-mono text-gray-800">{dayjs(date).format('YYYY-MM-DD')}</td>
                                </tr>
                                {desc && (
                                    <tr>
                                        <td className="font-medium text-gray-600 flex">
                                            <div className="bg-gray-100 py-0.5 px-2 rounded-md text-2xs">Desc</div>
                                        </td>
                                        <td className="text-gray-800 align-middle">{desc}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditHolidayModal = (props: AliceModalProps<{ holidayId: number; date: number; desc: string; name: string }>) => {
    const { setOkText, setOnOk, context, setOpen } = props;
    const dispatch = useAppDispatch();
    const { holidayId, date: initialDate, desc: initialDesc, name: initialName } = context || {};
    setOkText('Confirm');
    const [name, setName] = useState(initialName);
    const [desc, setDesc] = useState(initialDesc);
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs(initialDate));

    const deleteHoliday = useMutation({
        mutationKey: queryKeys.CUSTOM_HOLIDAYS,
        mutationFn: async () => {
            return await apiClient.delete<CustomResponse<void>>(apiRoutes.DELETE_CUSTOM_HOLIDAY(holidayId));
        },
        onMutate: () => {
            dispatch(appSlice.actions.setLoading(true));
        },
        onSettled: () => {
            dispatch(appSlice.actions.setLoading(false));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.CUSTOM_HOLIDAYS });
        },
    });

    const queryClient = useQueryClient();

    const updateHoliday = useMutation({
        mutationKey: queryKeys.CUSTOM_HOLIDAYS,
        onMutate: () => {
            dispatch(appSlice.actions.setLoading(true));
        },
        onSettled: () => {
            dispatch(appSlice.actions.setLoading(false));
        },
        mutationFn: async () => {
            return await apiClient.put<CustomResponse<void>, UpodateHolidayDTO>(
                apiRoutes.PUT_UPDATE_CUSTOM_HOLIDAY(holidayId),
                {
                    date: date.valueOf(),
                    desc,
                    name,
                }
            );
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.CUSTOM_HOLIDAYS });
        },
    });

    setOnOk(updateHoliday.mutate);

    return (
        <div>
            <div className="flex items-center gap-2 justify-between">
                <SectionTitle>Edit Holiday</SectionTitle>
                <div>
                    <AliceModalTrigger
                        modalContent={props => {
                            props.setOkText('Yes');
                            props.setOnOk(async () => {
                                await deleteHoliday.mutateAsync();
                                props.setOpen(false);
                            });
                            return <div>Are you sure to delete?</div>;
                        }}
                    >
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                setOpen(false);
                                // setOpen(false);
                            }}
                        >
                            Delete
                        </Button>
                    </AliceModalTrigger>
                </div>
            </div>
            <Spacer />
            <FormInputField value={name} title="Holiday Name" onChange={t => setName(t)} />
            <FormInputField value={desc} title="Holiday Description" onChange={t => setDesc(t)} />
            <FormInputTitle>Date</FormInputTitle>
            <DatePicker
                value={date}
                onChange={newDate => {
                    if (newDate) {
                        setDate(newDate);
                    }
                }}
                className="w-full"
            />

            <Spacer />
        </div>
    );
};
