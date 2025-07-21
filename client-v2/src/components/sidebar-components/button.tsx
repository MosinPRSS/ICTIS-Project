type ButtonTemplate = {
    name: string;
    url: string;
    img_url: string;
    is_activated: boolean;
    is_collapsed?: boolean;
};

export default function Button({
    name, url, img_url, is_activated, is_collapsed = false
}: ButtonTemplate) {
    return (
        <div
            className={`
                flex items-center m-2 rounded-lg p-2 cursor-pointer
                ${is_activated ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black'}
                hover:bg-gray-700 transition-all duration-300
            `}
        >
            <div className="flex justify-center w-8 h-8">
                {img_url && <img src={img_url} className="h-full w-full object-cover" />}
            </div>

            {!is_collapsed && (
                <a
                    href={url}
                    className="ml-2 text-sm font-semibold truncate"
                >
                    {name}
                </a>
            )}
        </div>
    );
}