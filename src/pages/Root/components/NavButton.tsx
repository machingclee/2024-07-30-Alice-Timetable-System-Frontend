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
            <a
                href={routeEnum.toString()}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    props.onClick?.();
                    if (event.button === 1 || (event.ctrlKey && event.button === 0)) {
                        // middle-click or ctrl+leftclick
                        window.open(routeEnum, '_blank');
                    } else {
                        navigate(routeEnum);
                    }
                }}
            >
                <Button
                    className={`!py-4.5 !p-4 !rounded-md ${!active ? '' : ''} !shadow-none hover:opacity-60 !justify-start`}
                    block
                    type={active ? 'primary' : 'text'}
                >
                    <div key={path} style={{ textTransform: 'capitalize' }} className="flex items-center gap-2">
                        {icon} {title}
                    </div>
                </Button>
            </a>
        </>
    );
}
