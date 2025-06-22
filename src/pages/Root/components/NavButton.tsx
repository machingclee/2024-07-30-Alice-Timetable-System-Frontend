import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteEnum from '../../../enum/RouteEnum';
import { ReactNode } from 'react';

export default function NavButton(props: {
    activeNavigationRegex: RegExp;
    title: string;
    routeEnum: RouteEnum;
    icon?: ReactNode;
    onClick?: () => void;
}) {
    const { pathname } = useLocation();
    const { activeNavigationRegex, routeEnum, title, icon } = props;
    const navigate = useNavigate();
    const path = routeEnum.toString();
    const active = activeNavigationRegex.test(pathname || '');

    return (
        <>
            <Button
                className={`!py-4.5 !p-4 !rounded-md ${!active ? '!bg-[rgb(255,255,255,1)]' : ''} !shadow-none hover:opacity-60 !justify-start`}
                block
                type={active ? 'primary' : 'text'}
                onClick={() => {
                    props.onClick?.();
                    navigate(routeEnum);
                }}
            >
                <div key={path} style={{ textTransform: 'capitalize' }} className="flex items-center gap-2">
                    {icon} {title}
                </div>
            </Button>
        </>
    );
}
