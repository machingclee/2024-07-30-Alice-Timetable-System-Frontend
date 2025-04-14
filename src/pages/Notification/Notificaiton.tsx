import SectionTitle from '@/components/SectionTitle';
import Spacer from '@/components/Spacer';
import { NotificationResponse } from '@/dto/kotlinDto';
import queryKeys from '@/reactQueries/queryKeys';
import useBaseQuery from '@/reactQueries/useBaseQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { NotificationThunkAction } from '@/redux/slices/notificationSlice';
import toastUtil from '@/utils/toastUtil';
import { Button, Spin } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from 'react-icons/fa6';
import { MdOutlineRefresh } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { MdMessage } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AliceDropdownMenu } from '@/components/CustomDropdownMenu';
import classnames from 'classnames';
import boxShadow from '@/constant/boxShadow';
import RouteEnum from '@/enum/RouteEnum';

export default function Notification() {
    const notifications = useAppSelector(s => s.notification.notificationResponses);
    const dispatch = useAppDispatch();

    const { query, invalidation } = useBaseQuery({
        queryFn: async () => {
            dispatch(NotificationThunkAction.getNotifications());
            return null;
        },
        enabled: true,
        queryKey: queryKeys.NOTIFICATIONS,
        gcTime: 0,
        staleTime: 0,
    });

    if (query.isFetching) {
        return <Spin />;
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-4 items-center">
                <SectionTitle>Notification</SectionTitle>
                <Button
                    loading={query.isFetching}
                    className="!rounded-2xl active:scale-75"
                    onClick={() => {
                        invalidation();
                    }}
                >
                    <MdOutlineRefresh size={24} /> Refresh
                </Button>
            </div>
            <Spacer />
            <div className="h-[calc(100vh-80px)] overflow-y-scroll m-1 p-1">
                {notifications.concat(notifications).map(n => {
                    return <NotificationRow key={n.notification.id} notificationResponse={n} />;
                })}
            </div>
        </div>
    );
}

const NotificationRow = (props: { notificationResponse: NotificationResponse }) => {
    const { notificationResponse } = props;
    const { notification, student } = notificationResponse;
    const { message } = notification;
    const { phoneNumber } = student;
    const dispatch = useAppDispatch();

    return (
        <div
            style={{ boxShadow: boxShadow.SHADOW_62 }}
            className={classnames(
                'p-4 pt-2 mb-3 rounded-xl',
                {
                    'border-none': notification.isRead,
                    'border-green-400 border-1': !notification.isRead,
                },
                {
                    'bg-gray-100': notification.isRead,
                    'bg-[#f0fdf9]': !notification.isRead,
                },
                {
                    '!text-gray-400': notification.isRead,
                    '!text-inherit': !notification.isRead,
                }
            )}
        >
            <div className="text-lg flex justify-between">
                <div className="flex items-center gap-4 text-[#62aa76]">
                    <div className=" gap-2 flex items-center">
                        <MdMessage />
                        <div>Message</div>
                    </div>

                    <div className="flex items-center">
                        <IoLogoWhatsapp className="mr-2" /> {phoneNumber}
                    </div>

                    <div
                        className={`font-mono text-sm border-1 px-4 rounded-md cursor-pointer
                             hover:text-gray-600 hover:border-gray-800 bg-white py-1 transition-all duration-300 ease-in-out`}
                        onClick={() => {
                            window.open(`${RouteEnum.STUDENT_INFO}/${student.id}`);
                        }}
                    >
                        Package Attendences
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                    <AliceDropdownMenu
                        className="w-44"
                        align="end" // Can be "start", "center", or "end"
                        side="bottom" // Can be "top", "right", "bottom", or "left"
                        alignOffset={10} // horizontal offset, +ve to left, -ve to right
                        sideOffset={5} // vertical offset +ve to down, -ve to up
                        items={[
                            {
                                item: notification.isRead ? 'Mark as unread' : 'Mark as read',
                                onClick: () => {
                                    dispatch(NotificationThunkAction.updateReadOrUnread(notification.id!));
                                },
                            },
                        ]}
                    >
                        <Button>
                            <SlOptions />
                        </Button>
                    </AliceDropdownMenu>

                    <CopyToClipboard
                        text={message}
                        onCopy={() => {
                            toastUtil.success('Copied to Clipboard');
                        }}
                    >
                        <Button>
                            <FaRegCopy />
                        </Button>
                    </CopyToClipboard>
                </div>
            </div>
            <div className={classnames('flex mt-2 border-l-4 border-[#E9F2E8] pl-4 items-center')}>
                <div className="flex-1">{message}</div>
            </div>
        </div>
    );
};
