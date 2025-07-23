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
        <a href={url}>
            <div
                className={`
                    flex items-center m-2 rounded-lg p-2 cursor-pointer
                    ${is_activated ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black'}
                    hover:bg-gray-700 transition-all duration-300
                `}
            >
                <div className="w-8 h-8 flex-shrink-0">
                    {img_url && <img src={img_url} className="h-full w-full object-cover rounded" />}
                </div>

                <div
                    className={`
                        ml-2 text-sm font-semibold truncate transition-all duration-300 
                        ${is_collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
                    `}
                >
                    {name}
                </div>
            </div>
        </a>
    );
}
