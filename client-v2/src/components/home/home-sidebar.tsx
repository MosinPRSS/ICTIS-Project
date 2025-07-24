import { useState, useEffect } from 'react';
import Button from "./sidebar-components/button";
import ExpandButton from "./sidebar-components/expand";
import Separator from './sidebar-components/separator';

type Props = {
  isOpened: boolean;
  onToggle: (opened: boolean) => void;
};

export default function SideBar({ isOpened, onToggle }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      onToggle(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);

  if (isMobile) return null;

  return (
    <div
      className={`
        flex flex-col bg-gray-400 h-full items-center
        transition-all duration-300 overflow-hidden
        ${isOpened ? "w-60 px-4" : "w-16 px-0"}
      `}
    >

      <div className="w-full mt-4">
        <ExpandButton
          is_opened={isOpened}
          onClick={() => onToggle(!isOpened)}
        />
      </div>

      <div className="flex-1 mt-4 flex flex-col gap-2 items-start w-full mr-8">
        <Button
          name="Главная"
          url="/"
          is_activated={true}
          img_url={"/homyak.jpg"}
          is_collapsed={!isOpened}
        />
        <Separator />
        <Button
          name="Профиль"
          url="/profile"
          is_activated={false}
          img_url={"/homyak.jpg"}
          is_collapsed={!isOpened}
        />
      </div>
    </div>
  );
}
