import { useEffect, useRef, useState } from "react";

export default function MobileBottomNav({ scrollContainerRef, isBlurred }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!el) return;

    const onScroll = () => {
      const currentY = el.scrollTop;

      if (currentY > lastScrollY.current + 5) {
        setVisible(false); // скролл вниз
      } else if (currentY < lastScrollY.current - 5) {
        setVisible(true); // скролл вверх
      }

      lastScrollY.current = currentY;
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 
        bg-white border-t border-gray-300 shadow-md 
        flex justify-around items-center h-14 
        transform transition-transform duration-300 
        ${visible ? "translate-y-0" : "translate-y-full"} 
        ${isBlurred ? "blur-sm" : "blur-0"}
        md:hidden
      `}
    >
      <a href="/" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-500">
        <img className="h-8 w-8" src="/homyak.jpg" />
        <span className="text-xs">Главная</span>
      </a>
      <a href="/profile" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-500">
        <img className="h-8 w-8" src="/homyak.jpg" />
        <span className="text-xs">Чаты</span>
      </a>
      <a href="/profile" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-500">
        <img className="h-8 w-8" src="/homyak.jpg" />
        <span className="text-xs">Создать бота</span>
      </a>
      <a href="/profile" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-500">
        <img className="h-8 w-8" src="/homyak.jpg" />
        <span className="text-xs">Персоны</span>
      </a>
      <a href="/settings" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-500">
        <img className="h-8 w-8" src="/homyak.jpg" />
        <span className="text-xs">Профиль</span>
      </a>
    </div>
  );
}
