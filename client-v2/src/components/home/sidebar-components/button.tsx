import { useEffect, useRef } from "react";

type ButtonTemplate = {
    name: string;
    url: string;
    img_url: string;
    is_collapsed?: boolean;
};
type PremiumButtonTemplate = {
    name: string;
    url: string;
    img_url: string;
    is_collapsed?: boolean;
    is_premium?: boolean;
};

export default function Button({
    name, url, img_url, is_collapsed = false
}: ButtonTemplate) {
    return (
        <a href={url} className="">
        <div
            className={`
            flex items-center rounded-sm py-1 px-2 cursor-pointer
          bg-gray-500/20 text-black
            hover:bg-gray-700 transition-all duration-300
            `}
        >
            <div className="w-6 h-6 flex-shrink-0 ml-1">
            {img_url && (
                <img
                src={img_url}
                className="h-full w-full object-cover rounded-sm"
                />
            )}
            </div>

            <div
            className={`
                ml-6 text-sm font-semibold truncate transition-all duration-300 
                ${is_collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
            `}
            >
            {name}
            </div>
        </div>
        </a>
    );
}

export function PremiumButton({
    name, url, img_url, is_collapsed = false, is_premium
}: PremiumButtonTemplate) {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const el = buttonRef.current;
        if (!el) return;

        let angle = 0;
        const animate = () => {
            angle = (angle + 1) % 360;
            el.style.setProperty('--border-angle', `${angle}deg`);
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <a
            ref={buttonRef}
            href={url}
            className=""
        >
            <div
                className={`
                    animate-rotate
                    flex items-center rounded-sm py-1 px-2 cursor-pointer
                    bg-gray-500/20 text-black
                    hover:bg-gray-700 transition-all duration-300
                    relative z-10
                `}
            >
                <div className="w-6 h-6 flex-shrink-0 ml-1">
                    {img_url && (
                        <img
                            src={img_url}
                            className="h-full w-full object-cover rounded-sm"
                            alt=""
                        />
                    )}
                </div>

                <div
                    className={`
                        ml-6 text-sm font-semibold truncate transition-all duration-300 
                        ${is_collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
                    `}
                >
                    {name}
                </div>
            </div>
        </a>
    );
}

