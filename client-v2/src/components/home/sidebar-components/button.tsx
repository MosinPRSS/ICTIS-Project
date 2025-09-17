import { useEffect, useRef } from "react";

type ButtonTemplate = {
    name: string;
    url: string;
    icon?: React.ReactNode;
    img_url?: string;
    is_collapsed?: boolean;
};

type PremiumButtonTemplate = ButtonTemplate & {
    is_premium?: boolean;
};

export default function Button({
    name, url, icon, img_url, is_collapsed = false
}: ButtonTemplate) {
    return (
        <a href={url} className="w-full">
            <div
                className={`
                    flex items-center rounded-sm py-2 px-2 cursor-pointer
                    bg-gray-500/20 text-black
                    hover:bg-gray-700 transition-all duration-300
                    ${is_collapsed ? 'w-10 h-10 justify-center' : 'w-full max-w-[180px] justify-start'}
                `}
            >
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    {icon ? (
                        icon
                    ) : img_url ? (
                        <img
                            src={img_url}
                            className="h-full w-full object-cover rounded-sm"
                            alt=""
                        />
                    ) : null}
                </div>

                {!is_collapsed && (
                    <div className="ml-2 text-sm font-semibold truncate">
                        {name}
                    </div>
                )}
            </div>
        </a>
    );
}

export function PremiumButton({
    name, url, icon, img_url, is_collapsed = false, is_premium
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
                    flex items-center rounded-sm py-2 px-2 cursor-pointer
                    bg-gray-500/20 text-black
                    hover:bg-gray-700 transition-all duration-300
                    ${is_collapsed ? 'w-10 h-10 justify-center' : 'w-full max-w-[180px] justify-start'}
                `}
            >
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    {icon ? (
                        icon
                    ) : img_url ? (
                        <img
                            src={img_url}
                            className="h-full w-full object-cover rounded-sm"
                            alt=""
                        />
                    ) : null}
                </div>

                {!is_collapsed && (
                    <div className="ml-2 text-sm font-semibold truncate">
                        {name}
                    </div>
                )}
            </div>
        </a>
    );
}