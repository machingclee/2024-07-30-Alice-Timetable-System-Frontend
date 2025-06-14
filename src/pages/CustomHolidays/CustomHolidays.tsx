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
                            const { id, desc, name, date } = holiday;
                            return <Holiday holidayId={id} name={name} date={date} desc={desc} />;
                        })}
                    </div>
                </div>
                <div className="w-[320px]">
                    <Box
                        sx={{
                            '& .ant-picker-calendar-date-value': {
                                display: 'none',
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
                                    const isHoliday = customHolidaysQuery.data?.some(
                                        holiday =>
                                            dayjs(holiday.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                                    );
                                    return (
                                        <div
                                            className="w-full h-full flex items-center justify-center"
                                            style={{ position: 'relative', zIndex: 1 }}
                                        >
                                            {isHoliday ? (
                                                <div className="w-7 h-7 bg-emerald-200 rounded-md flex items-center justify-center font-semibold text-emerald-700">
                                                    {date.date()}
                                                </div>
                                            ) : (
                                                <span className="text-gray-700">{date.date()}</span>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
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
    const { setOkText, setOnOk, context } = props;
    const dispatch = useAppDispatch();
    const { holidayId, date: initialDate, desc: initialDesc, name: initialName } = context || {};
    setOkText('Confirm');
    const [name, setName] = useState(initialName);
    const [desc, setDesc] = useState(initialDesc);
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs(initialDate));

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
            <SectionTitle>Edit Holiday</SectionTitle>
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
