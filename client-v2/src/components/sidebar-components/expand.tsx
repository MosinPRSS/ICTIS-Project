import { FC } from 'react';

type ExpandButtonProps = {
    is_opened: boolean;
    onClick: () => void;
};

const ExpandButton: FC<ExpandButtonProps> = ({ is_opened, onClick }) => {
    return (
        <div className="flex w-full h-1/16 bg-red-400">
            <button 
                onClick={onClick} 
                className="flex-1 flex items-center justify-center text-white"
                aria-label={is_opened ? "Свернуть" : "Развернуть"}
            >
                {is_opened ? ">" : "<"}
            </button>
        </div>
    );
};

export default ExpandButton;