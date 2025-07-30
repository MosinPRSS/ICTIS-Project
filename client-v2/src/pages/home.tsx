import { useState, useEffect, useRef } from "react";
import MainBar from "../components/home/home-mainbar";
import SearchBox from "../components/home/mainbar-components/search-field";
import SideBar from "../components/home/home-sidebar";
import PocketButton from "../components/home/sidebar-components/pocket";
import MobileBottomNav from "../components/home/mobile-components/mobile-bottom-bar";
import AuthForm from "../components/auth/authform";
import { isAuthenticated } from '../api/token_service'; // Убедись, что путь правильный

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Состояние для отображения модального окна авторизации
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Состояние: авторизован ли пользователь (основано на проверке токенов)
  const [isReg, setIsReg] = useState<boolean>(false); 
  
  // Состояние: идет ли проверка токенов при загрузке
  const [isLoadingAuthCheck, setIsLoadingAuthCheck] = useState<boolean>(true); 

  // Состояния для данных пользователя
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/homyak.jpg");

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

  // Эффект для проверки аутентификации при монтировании компонента
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      setIsLoadingAuthCheck(true);
      try {
        const authStatus = await isAuthenticated(); // Проверяем токены через нашу утилиту
        setIsReg(authStatus); // true если токены валидны
        
        if (authStatus) {
          // Если авторизован, берем данные из localStorage
          try {
            const storedUsername = localStorage.getItem('username');
            const storedAvatarUrl = localStorage.getItem('avatarUrl');
            
            if (storedUsername) {
              setUsername(storedUsername);
            } else {
              setUsername("Пользователь"); // fallback
            }
            
            if (storedAvatarUrl) {
              setAvatarUrl(storedAvatarUrl);
            } else {
              setAvatarUrl("/homyak.jpg"); // fallback
            }
            
          } catch (err) {
            console.error("Ошибка при получении данных пользователя из localStorage:", err);
            setUsername("Пользователь");
            setAvatarUrl("/homyak.jpg");
          }
        } else {
            // Если не авторизован, сбросим данные
            setUsername(null);
            setAvatarUrl("/homyak.jpg");
        }
      } catch (err) {
        console.error("Ошибка при проверке аутентификации:", err);
        setIsReg(false); // Считаем неавторизованным в случае ошибки
        setUsername(null);
        setAvatarUrl("/homyak.jpg");
      } finally {
        setIsLoadingAuthCheck(false);
      }
    };

    checkAuthenticationStatus();
  }, []); // Запускается один раз при монтировании

  // Эффект для управления прокруткой body при открытии/закрытии модалки
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Очистка стилей при размонтировании компонента
    return () => {
         document.body.style.overflow = "";
    };
  }, [isAuthModalOpen]);

  // Функция открытия модального окна авторизации
  const openAuthModal = (method = "login") => {
    // Открываем модалку только если проверка завершена и пользователь не авторизован
    if (!isLoadingAuthCheck && !isReg) {
      setIsAuthModalOpen(true);
    }
    // Если isLoadingAuthCheck === true, можно показать индикатор загрузки
    // Если isReg === true, модалка не откроется
  };

  // Функция, вызываемая после успешной авторизации/регистрации
  const handleAuthSuccess = () => {
    // Перепроверяем состояние авторизации через API
    const updateAuthState = async () => {
      try {
        setIsLoadingAuthCheck(true); // Показываем индикатор загрузки
        const authStatus = await isAuthenticated(); // Проверяем токены
        setIsReg(authStatus); // Устанавливаем реальный статус
        
        if (authStatus) {
          // Если авторизован, обновляем данные пользователя
          try {
            const storedUsername = localStorage.getItem('username');
            const storedAvatarUrl = localStorage.getItem('avatarUrl');
            
            if (storedUsername) {
              setUsername(storedUsername);
            } else {
              setUsername("Пользователь");
            }
            
            if (storedAvatarUrl) {
              setAvatarUrl(storedAvatarUrl);
            } else {
              setAvatarUrl("/homyak.jpg");
            }
          } catch (err) {
            console.error("Ошибка при получении данных пользователя:", err);
            setUsername("Пользователь");
            setAvatarUrl("/homyak.jpg");
          }
        } else {
          // Если вдруг токены недействительны
          setUsername(null);
          setAvatarUrl("/homyak.jpg");
        }
      } catch (err) {
        console.error("Ошибка при проверке аутентификации после авторизации:", err);
        setIsReg(false);
        setUsername(null);
        setAvatarUrl("/homyak.jpg");
      } finally {
        setIsLoadingAuthCheck(false);
        setIsAuthModalOpen(false); // Закрываем модальное окно
      }
    };

    updateAuthState();
  };

  // Функция закрытия модального окна
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Пока идет проверка аутентификации, можно ничего не показывать
  if (isLoadingAuthCheck) {
      return null; // <div>Проверка авторизации...</div>;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      
      {/* Основной контент - отображается всегда */}
      <div className={`flex flex-col h-full transition-all duration-300 ${isAuthModalOpen ? "blur-sm" : "blur-0"}`}>
        <div className="flex flex-1 overflow-hidden">
          
          {/* Сайдбар */}
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
              flex-shrink-0 overflow-hidden
            `}
          >
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
              {/* Передаем дополнительные пропсы в SideBar */}
              <SideBar 
                isOpened={isSidebarOpened} 
                onToggle={setIsSidebarOpened}
                isReg={isReg}
                onOpenAuth={openAuthModal}
                username={username || undefined}
                avatarUrl={avatarUrl}
              />
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="flex-1 flex flex-col">
            <div className="h-16 flex items-center bg-gray-100 shadow-sm">
              <SearchBox />
            </div>
            <div className="flex-1 p-4 overflow-auto bg-gray-100">
              {/* Передаем openAuthModal, который теперь учитывает isReg */}
              <MainBar 
                isSidebarOpened={isSidebarOpened} 
                onOpenAuth={openAuthModal} 
              />
            </div>
          </div>
        </div>
        
        {/* Нижняя панель */}
        <div className="flex">
          <MobileBottomNav scrollContainerRef={scrollContainerRef} isBlurred={isAuthModalOpen} />
        </div>
      </div>
      
      {/* Модальное окно авторизации - отображается по условию */}
      {/* Оно будет отображаться только если isAuthModalOpen === true */}
      {/* И только если пользователь не авторизован */}
      {isAuthModalOpen && !isReg && (
        <AuthForm 
          isOpen={isAuthModalOpen} 
          onClose={handleCloseAuthModal} 
          onSuccess={handleAuthSuccess} // Передаем функцию
        />
      )}
    </div>
  );
}