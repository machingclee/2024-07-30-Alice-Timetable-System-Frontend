import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Label from '../../../components/Label';
import RouteEnum from '../../../enum/RouteEnum';

export default function NavButton(props: { activeNavigationRegex: RegExp; title: string; routeEnum: RouteEnum }) {
    const { pathname } = useLocation();
    const { activeNavigationRegex, routeEnum, title } = props;
    const navigate = useNavigate();
    const path = routeEnum.toString();
    const active = activeNavigationRegex.test(pathname || '');

    return (
        <>
            <Label label="NavButton.tsx" offsetLeft={10} offsetTop={-10} />
            <Button
                block
                style={{ paddingTop: 18, paddingBottom: 18 }}
                type={active ? 'primary' : 'default'}
                onClick={() => {
                    navigate(routeEnum);
                }}
            >
                <div key={path} style={{ textTransform: 'capitalize', fontSize: 16 }}>
                    {title}
                </div>
            </Button>
        </>
    );
}
