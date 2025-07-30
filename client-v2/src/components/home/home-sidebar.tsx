import { useState, useEffect } from 'react';
import Button from "./sidebar-components/button";
import ExpandButton from "./sidebar-components/expand";
import Separator from './sidebar-components/separator';
import ProfileButton from './sidebar-components/profile_button';

type Props = {
  isOpened: boolean;
  onToggle: (opened: boolean) => void;
  isReg: boolean;
  onOpenAuth: () => void;
  username?: string;
  avatarUrl?: string;
  onOpenSettings: () => void;
};

export default function SideBar({ 
  isOpened, 
  onToggle,
  isReg,
  onOpenAuth,
  username,
  avatarUrl,
  onOpenSettings
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className={`
        flex flex-col bg-gray-400 h-full
        transition-all duration-300 overflow-hidden
        items-center
        ${isOpened ? "w-60 px-4" : "w-16 px-0"}
      `}
    >

      <div className="w-full mt-4">
        <ExpandButton
          is_opened={isOpened}
          onClick={() => onToggle(!isOpened)}
        />
      </div>

      <div className="flex-1 mt-4 flex flex-col gap-2 items-center w-full mr-8">
        <div className={isOpened ? "w-full" : "flex items-center w-full"}>
          <Button
            name="Главная"
            url="/"
            is_activated={true}
            img_url={"/homyak.jpg"}
            is_collapsed={!isOpened}
          />
        </div>
        <Separator />
      </div>

      <div className={`${isOpened ? "w-full px-2" : "flex items-center w-full px-2"} mb-4 mr-8`}>
        <ProfileButton
          isReg={isReg}
          username={username}
          avatarUrl={avatarUrl}
          onOpenAuth={onOpenAuth}
          onOpenSettings={onOpenSettings}
          isCollapsed={!isOpened}
        />
      </div>
    </div>
  );
}