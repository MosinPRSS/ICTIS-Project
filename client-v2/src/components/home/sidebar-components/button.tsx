import { useEffect, useRef } from "react";

type ButtonTemplate = {
    name: string;
    url: string;
    icon?: React.ReactNode; // Для SVG иконок
    img_url?: string;       // Для обычных изображений
    is_collapsed?: boolean;
};

type PremiumButtonTemplate = ButtonTemplate & {
    is_premium?: boolean;
};

export default function Button({
    name, url, icon, img_url, is_collapsed = false
}: ButtonTemplate) {
    return (
        <a href={url} className="group relative">
            <div
                className={`
                    group relative flex items-center rounded-sm py-2 px-2 cursor-pointer
                    bg-gray-500/20 text-black overflow-hidden
                    hover:bg-gray-700 transition-all duration-300
                `}
            >
                <div className="w-6 h-6 flex-shrink-0 ml-2 mt- justify-center">
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

                <div
                    className={`
                        ml-6 text-sm font-semibold truncate transition-all duration-300 
                        ${is_collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
                    `}
                >
                    {name}
                </div>

                <div className="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="relative h-full w-8 bg-white/30"></div>
                </div>
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
                    animate-rotate
                    flex items-center rounded-sm py-1 px-2 cursor-pointer
                    bg-gray-500/20 text-black
                    hover:bg-gray-700 transition-all duration-300
                    relative z-10
                `}
            >
                <div className="w-6 h-6 flex-shrink-0 ml-1">
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