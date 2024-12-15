import { PropsWithChildren } from 'react';
import colors from '../constant/colors';

export default function FormInputTitle({ children }: PropsWithChildren) {
    return (
        <div
            style={{
                color: colors.GREY_DEEP,
                fontWeight: 400,
                fontSize: 16,
                paddingLeft: 4,
            }}
        >
            {children}
        </div>
    );
}
