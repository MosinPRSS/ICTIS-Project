export default function TagButton({ name, amount, isClicked = false, onClick }) {
    return (
        <div
            className={`
                flex items-center justify-between
                bg-gray-700 hover:bg-gray-600
                rounded-md
                px-3 py-1
                mr-1
                min-w-0
                cursor-pointer
                transition-all duration-200
                shadow-sm hover:shadow-xl/20
                ${isClicked ? 'ring-2 ring-blue-400 bg-gray-600' : ''}
                relative z-30
            `}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-pressed={isClicked}
        >
            <span className="text-white text-sm font-medium truncate mx-1">
                {name}
            </span>

            <span
                className="
                    flex-shrink-0
                    bg-gray-800 text-white
                    rounded-sm
                    w-6 h-6
                    flex items-center justify-center
                    text-xs font-bold
                "
            >
                {amount}
            </span>
        </div>
    );
}