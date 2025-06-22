import { HTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';
export default function ContentContainer({
    children,
    className,
    ...props
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classnames('border-1 p-2 bg-teal-100 rounded-lg border-teal-400', className)} {...props}>
            {children}
        </div>
    );
}
