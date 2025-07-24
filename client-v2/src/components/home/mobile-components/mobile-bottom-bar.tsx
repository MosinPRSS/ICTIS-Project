export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-md flex justify-around items-center h-14 md:hidden">
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
