import { useState, useEffect } from "react";
import MainBar from "../components/home/home-mainbar";
import SearchBox from "../components/home/mainbar-components/search-field";
import SideBar from "../components/home/home-sidebar";
import PocketButton from "../components/home/sidebar-components/pocket";
import MobileBottomNav from "../components/home/mobile-components/mobile-bottom-bar";

export default function Home() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpened(false);
      } else {
        setIsSidebarOpened(true);
      }
    };

    handleResize(); // инициализация
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Сайдбар и кармашек */}
      <div
        className={`
          relative transition-all duration-300
          ${isMobile
            ? isSidebarOpened
              ? "w-60 bg-gray-400"
              : "w-0 bg-transparent"
            : isSidebarOpened
            ? "w-60 bg-gray-400"
            : "w-4 bg-transparent"
          }
          flex-shrink-0
          overflow-hidden
        `}
      >
        {/* Кармашек не показываем на мобильных */}
        {!isMobile && !isSidebarOpened && (
          <PocketButton onClick={() => setIsSidebarOpened(true)} />
        )}

        <div
          className={`
            absolute inset-0 p-4 transition-all duration-300
            ${isSidebarOpened
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-4 pointer-events-none"
            }
          `}
        >
          <SideBar isOpened={isSidebarOpened} onToggle={setIsSidebarOpened} />
        </div>
      </div>

      {/* Основная часть */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 flex items-center bg-gray-100 shadow-sm">
          <SearchBox />
        </div>

        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          <MainBar isSidebarOpened={isSidebarOpened} />
        </div>
      </div>

      {/* Нижнее мобильное меню */}
      <MobileBottomNav />
    </div>
  );
}
