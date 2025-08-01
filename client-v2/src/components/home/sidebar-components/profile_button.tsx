import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../../api/consts';

type ProfileButtonProps = {
  isReg: boolean;
  username?: string;
  avatarUrl?: string;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  isCollapsed?: boolean;
};

export default function ProfileButton({
  isReg,
  username = "Пользователь",
  avatarUrl = "/homyak.jpg",
  onOpenAuth,
  onOpenSettings,
  isCollapsed = false,
}: ProfileButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProfileAreaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isReg && onOpenAuth) {
      onOpenAuth();
    }
  };

  const handleProfileInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isReg) {
      navigate('/profile/' + localStorage.getItem("userID"));
    }
  };

  if (isCollapsed) {
    // Свернутый вид - только аватар или иконка
    return (
      <div 
        className={`
          flex items-center justify-center w-8 h-8 rounded-sm cursor-pointer
          ${isHovered ? 'bg-gray-500' : ''} transition-all duration-200
        `}
        onClick={!isReg ? handleProfileAreaClick : handleProfileInfoClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isReg ? "Профиль пользователя" : "Войти или зарегистрироваться"}
      >
        {isReg ? (
          <img 
            src={base_url + avatarUrl} 
            alt="Аватар пользователя" 
            className="w-full h-full object-cover rounded-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/homyak.jpg';
            }}
          />
        ) : (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
    );
  }

  // Развернутый вид
  return (
    <div 
      className={`
        flex items-center w-full rounded-sm py-2 px-2 cursor-pointer transition-all duration-200
        ${isHovered ? 'bg-gray-500' : ''} 
      `}
      onClick={!isReg ? handleProfileAreaClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isReg ? "Профиль пользователя" : "Войти или зарегистрироваться"}
    >
      {isReg ? (
        <>
          <div 
            className="flex-shrink-0 w-8 h-8 rounded-sm overflow-hidden cursor-pointer"
            onClick={handleProfileInfoClick}
          >
            <img 
              src={base_url + avatarUrl} 
              alt="Аватар пользователя" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/homyak.jpg';
              }}
            />
          </div>
          
          <div className="flex items-center justify-between flex-1 min-w-0 ml-2">
            <span 
              className="text-sm font-semibold text-black truncate cursor-pointer"
              onClick={handleProfileInfoClick}
            >
              {username}
            </span>
            
            <button
              type="button"
              onClick={handleProfileInfoClick}
              className="flex-shrink-0 p-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Настройки"
            >
              <svg 
                className="w-5 h-5 text-black" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 w-8 h-8 rounded-sm overflow-hidden bg-gray-300 flex items-center justify-center shadow-xl/20">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <span className="text-sm font-semibold text-black ml-2 truncate">
            Вход / Регистрация
          </span>
        </div>
      )}
    </div>
  );
}