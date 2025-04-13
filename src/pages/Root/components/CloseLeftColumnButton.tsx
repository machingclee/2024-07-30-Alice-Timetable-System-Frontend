import { Button } from 'antd';
import FadeIn from '../../../components/FadeIn';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import appSlice from '../../../redux/slices/appSlice';
import { FaAngleLeft } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';

export default function CloseLeftColumnButton() {
    const dispatch = useAppDispatch();
    const leftNavigatorCollapsed = useAppSelector(s => s.app.leftNavigatorCollapsed);

    return (
        <>
            {leftNavigatorCollapsed && (
                <FadeIn>
                    <IoMenu
                        size={24}
                        onClick={() => {
                            dispatch(appSlice.actions.setleftNavigatorCollapsed(!leftNavigatorCollapsed));
                        }}
                        style={{
                            marginLeft: 20,
                            marginRight: 10,
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-out-in',
                            zIndex: 10 ** 100,
                            transform: leftNavigatorCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    />
                </FadeIn>
            )}
            {!leftNavigatorCollapsed && (
                <FadeIn>
                    <Button
                        type="text"
                        className="ml-3"
                        onClick={() => {
                            dispatch(appSlice.actions.setleftNavigatorCollapsed(!leftNavigatorCollapsed));
                        }}
                    >
                        <div style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>
                            <FaAngleLeft
                                size={20}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-out-in',
                                    zIndex: 10 ** 100,
                                    transform: leftNavigatorCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}
                            />
                            Close
                        </div>
                    </Button>
                </FadeIn>
            )}
        </>
    );
}
