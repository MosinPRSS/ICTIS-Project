// pages/profile.tsx
import { useEffect, useState } from 'react';
import SideBar from '../components/home/home-sidebar';
import PocketButton from '../components/home/sidebar-components/pocket'; // ✅ Импортируем PocketButton
import { isAuthenticated } from '../api/token_service';
import AuthForm from '../components/auth/authform';
import InfoBox from '../components/profile/mainbar-components/profile_info';

type ProfileProps = {
  user_id: string;
};

export default function Profile({ user_id }: ProfileProps) {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isReg, setIsReg] = useState<boolean>(false);
  const [isLoadingAuthCheck, setIsLoadingAuthCheck] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/homyak.jpg");
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const isOwnProfile = currentUser === user_id;

  // Проверка размера экрана
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Проверка аутентификации
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoadingAuthCheck(true);
      try {
        const authStatus = await isAuthenticated();
        setIsReg(authStatus);
        if (authStatus) {
          const storedUsername = localStorage.getItem('username');
          const storedAvatar = localStorage.getItem('avatarUrl');
          const storedUserID = localStorage.getItem('userID');

          setUsername(storedUsername || 'Пользователь');
          setAvatarUrl(storedAvatar || '/homyak.jpg');
          setCurrentUser(storedUserID);
        } else {
          setUsername(null);
          setAvatarUrl('/homyak.jpg');
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Ошибка при проверке аутентификации:', err);
        setIsReg(false);
        setUsername(null);
        setAvatarUrl('/homyak.jpg');
        setCurrentUser(null);
      } finally {
        setIsLoadingAuthCheck(false);
      }
    };

    checkAuth();
  }, []);

  // Блокировка скролла при открытии модалки
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  const openAuthModal = () => {
    if (!isLoadingAuthCheck && !isReg) {
      setIsAuthModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    const storedUsername = localStorage.getItem('username');
    const storedAvatar = localStorage.getItem('avatarUrl');
    const storedUserID = localStorage.getItem('userID');

    setUsername(storedUsername || 'Пользователь');
    setAvatarUrl(storedAvatar || '/homyak.jpg');
    setCurrentUser(storedUserID);
    setIsReg(true);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Основной макет */}
      <div className={`flex h-full transition-all duration-300 ${isAuthModalOpen ? "blur-sm" : "blur-0"}`}>
        {/* Сайдбар */}
        <div
          className={`
            relative transition-all duration-300
            ${isMobile
              ? isSidebarOpened ? "w-60 bg-gray-400" : "w-0"
              : isSidebarOpened ? "w-60 bg-gray-400" : "w-4 bg-transparent"
            }
            flex-shrink-0 overflow-hidden
          `}
        >
          {/* PocketButton — показывается только на десктопе, когда сайдбар закрыт */}
          {!isMobile && !isSidebarOpened && (
            <PocketButton onClick={() => setIsSidebarOpened(true)} />
          )}

          {/* Содержимое сайдбара */}
          <div
            className={`
              absolute inset-0 p-4 transition-all duration-300
              ${isSidebarOpened ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-4 pointer-events-none"}
            `}
          >
            <SideBar
              isOpened={isSidebarOpened}
              onToggle={setIsSidebarOpened}
              isReg={isReg}
              onOpenAuth={openAuthModal}
              username={username || undefined}
              avatarUrl={avatarUrl}
              onOpenSettings={() => alert('Настройки профиля')}
            />
          </div>
        </div>

        {/* Основной контент профиля */}
        <div className="flex-1 flex flex-col p-6 bg-gray-100">
          <div className="w-full flex items-center justify-center mb-6">
            <p className="text-xl font-semibold text-gray-800">Профиль пользователя</p>
          </div>

          <div className="w-full flex justify-start">
            <div className="w-1/3 min-w-80"> {/* min-w-80 — чтобы не схлопывался на узких экранах */}
              <InfoBox
              username='MosinPRSS'
              createdAt='28 Nov 2025'
              userId={localStorage.getItem("userID")}
              />
            </div>
          </div>
      </div>

      {/* Модальное окно авторизации */}
      {isAuthModalOpen && !isReg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseAuthModal}
          ></div>
          <AuthForm
            isOpen={isAuthModalOpen}
            onClose={handleCloseAuthModal}
            onSuccess={handleAuthSuccess}
          />
        </div>
      )}
    </div>
    </div>
  );
}