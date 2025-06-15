import SectionTitle from '@/components/SectionTitle';
import Spacer from '@/components/Spacer';
import { NotificationDTO, NotificationResponse } from '@/dto/kotlinDto';
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
import useNotificationQuery from '@/reactQueries/query/useNotificationQuery';

const notificationTypeToDisplayName: Record<NotificationDTO['type'], string> = {
    PACKAGE_DEADLINE_COMING: 'Package Deadline Coming',
    ATTENDENCE_WARNING: 'Attendence Warning',
};

export default function Notification() {
    const notifications = useAppSelector(s => s.notification.notificationResponses);
    const { query, invalidation: invalidateNotifications } = useNotificationQuery();

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
                        invalidateNotifications();
                    }}
                >
                    <MdOutlineRefresh size={24} /> Refresh
                </Button>
            </div>
            <Spacer />
            <div className="max-h-[calc(100vh-80px)] overflow-y-scroll m-1 p-1 grid grid-cols-1 min-[1400px]:grid-cols-2 min-[1850px]:grid-cols-3 gap-2 pb-60">
                {notifications
                    .slice(0)
                    .sort((n1, n2) => (n2?.notification?.createdAt || 0) - (n1?.notification?.createdAt || 0))
                    .map(n => {
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
                'p-4 pt-2 mb-3 rounded-md flex flex-col space-y-2 border-green-500 border-1 max-h-[200px]',
                {
                    'bg-[#f0fdf9] opacity-70': notification.isRead,
                    'bg-teal-50': !notification.isRead,
                },
                {
                    '!text-gray-300': notification.isRead,
                    '!text-inherit': !notification.isRead,
                }
            )}
        >
            <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white rounded-sm px-3 py-0.5">Type</span>
                {notificationTypeToDisplayName[notification.type]}
            </div>
            <div className="text-md flex justify-between">
                <div className="flex items-center gap-4 text-emerald-500">
                    <div className=" gap-2 flex items-center">
                        <MdMessage className="mt-0.5" />
                        <div>Message</div>
                    </div>

                    <div className="flex items-center">
                        <IoLogoWhatsapp className="mr-2" /> {phoneNumber}
                    </div>

                    <div
                        className={`font-mono text-xs border-1 px-4 border-emerald-500 rounded-md cursor-pointer
                             hover:text-gray-600 hover:border-gray-800 bg-white py-1 transition-all duration-300 ease-in-out`}
                        onClick={() => {
                            window.open(`${RouteEnum.STUDENT_INFO}/${student.id}#${notification.studentPackageId}`);
                        }}
                    >
                        Package Attendences
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
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
            <div className="bg-white px-10 py-4 rounded-sm border-1 border-emerald-400 flex-1 pb-6">
                <div className={classnames('flex mt-2 border-l-4 border-emerald-200 pl-4 items-center')}>
                    <div className="flex-1">{message}</div>
                </div>
            </div>
        </div>
    );
};
