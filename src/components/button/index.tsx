import { ComponentProps, FC } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ComponentProps<'button'> {
    onClick: () => void;
    title: string;
}

const Button: FC<ButtonProps> = ({ onClick, title, className }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={cn(
                    className,
                    'py-2 px-4 bg-blue-500 rounded-md text-white xl:text-base text-sm '
                )}
            >
                {title}
            </button>
        </div>
    );
};

export default Button;
