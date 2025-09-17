import { useState, useEffect } from 'react';
import Button, { PremiumButton } from "./sidebar-components/button";
import ExpandButton from "./sidebar-components/expand";
import Separator from './sidebar-components/separator';
import ProfileButton from './sidebar-components/profile_button';
import { HomeIcon, BotIcon } from '../../utils/icons'; 

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
    <div className="relative h-full bg-gray-400 overflow-hidden">
      <div
        className={`
          flex flex-col h-full justify-between
          transition-all duration-300
          ${isOpened ? "w-60" : "w-16"}
        `}
      >
        {/* Верх: Expand + Главная + кнопки */}
        <div className="p-2">
          {/* ExpandButton всегда сверху справа */}
          <div className="flex justify-end mb-2">
            <ExpandButton
              is_opened={isOpened}
              onClick={() => onToggle(!isOpened)}
            />
          </div>

          <Button
            name="Главная"
            url="/"
            icon={<HomeIcon />}
            is_collapsed={!isOpened}
          />
          <Separator />

          {!isReg ? (
            <div className="bg-gray-500 rounded-sm w-10/12 h-8 flex items-center justify-center" />
          ) : ( 
            <>
              <Button
                name="Создать бота"
                url="/"
                icon={<BotIcon />}
                is_collapsed={!isOpened}
              />
              <PremiumButton
                name="Подписка"
                url="/"
                img_url={"/crown.svg"}
                is_collapsed={!isOpened}
                is_premium={false}
              />
              <Separator />
              <Button
                name="Мои чаты"
                url="/"
                img_url={"/chats.svg"}
                is_collapsed={!isOpened}
              />
              <Button
                name="Мои персоны"
                url="/"
                img_url={"/persons.svg"}
                is_collapsed={!isOpened}
              />
              <Separator />
              <Button
                name="Помощь"
                url="/"
                img_url={"/persons.svg"}
                is_collapsed={!isOpened}
              />
            </>
          )}
        </div>
          
        {/* Низ */}
        <div className="w-full p-2">
          <Separator />
          <ProfileButton
            isReg={isReg}
            username={username}
            avatarUrl={avatarUrl}
            onOpenAuth={onOpenAuth}
            onOpenSettings={onOpenSettings}
            isCollapsed={!isOpened}
          />
          <Separator />
          <div className="flex flex-col items-center justify-center pt-2 w-full">
            <a className="font-semibold text-sm hover:underline mb-1 text-center"
              href="/">Пожаловаться</a>
            <a className="font-semibold text-sm hover:underline text-center"
              href="mailto:contact.mosin3310@gmail.com">Связаться с поддержкой</a>
          </div>
        </div>
      </div>
    </div>
  );
}
