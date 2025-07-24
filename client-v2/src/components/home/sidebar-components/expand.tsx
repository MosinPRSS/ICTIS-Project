import { FC } from 'react';

type ExpandButtonProps = {
    is_opened: boolean;
    onClick: () => void;
};


const ExpandButton: FC<ExpandButtonProps> = ({ is_opened, onClick }) => {
    return (
        <div className="w-full flex justify-end pr-4">
            <button
                onClick={onClick}
                className="w-8 h-8 
                bg-gray-600 
                rounded-xl 
                flex items-center justify-center 
                transition-transform duration-300
                hover:shadow-xl"
                aria-label={is_opened ? "Свернуть" : "Развернуть"}
            >
                <svg
                className={`w-4 h-4 text-white transform transition-transform duration-300 ${is_opened ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l7-7-7-7" />
                </svg>
            </button>
        </div>

    );
};

export default ExpandButton;