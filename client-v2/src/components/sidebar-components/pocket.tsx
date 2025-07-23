type Props = {
    onClick: () => void;
};

export default function PocketButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="absolute top-20 left-0 z-50 w-4 h-16 bg-gray-600 rounded-r-xl flex items-center justify-center"
            aria-label="Развернуть"
        >
            <svg
                className="w-3 h-3 text-white transform rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
}
