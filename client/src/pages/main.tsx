const App = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="fixed top-0 bottom-0 w-64 bg-purple-800 p-4 text-white text-center">
        <h1 className="text-3xl mb-4">ARI-ai</h1>
        <nav>
          <ul>
            <li className="mb-2"><a href="#" className="flex items-center hover:bg-purple-900 rounded"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>Главная страница</a></li>
            <li className="mb-2"><a href="#" className="flex items-center hover:bg-purple-900 rounded"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>Чаты</a></li>
            <li className="mb-2"><a href="#" className="flex items-center hover:bg-purple-900 rounded"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>Мои созданные виртуальные собеседники</a></li>
            <li className="mb-2"><a href="#" className="flex items-center hover:bg-purple-900 rounded"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>Создать нового персонажа</a></li>
          </ul>
        </nav>
        <div className="mt-auto">
          <a href="#" className="block p-2 mb-2 bg-purple-700 hover:bg-purple-600 rounded">Помощь</a>
          <a href="#" className="block p-2 bg-purple-700 hover:bg-purple-600 rounded">Соцсети нашего бота</a>
        </div>
      </div>

      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-sm mb-2">Выбери категорию</p>
            <div className="space-y-2">
              <label className="flex items-center"><input type="checkbox" /> Мужской пол</label>
              <label className="flex items-center"><input type="checkbox" /> Женский пол</label>
            </div>
          </div>
          <div className="flex-grow flex items-center">
            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>
            <input type="text" placeholder="Поиск..." className="w-full p-2 bg-gray-100 rounded-lg focus:outline" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[...Array(32)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/900)' }}></div>
              <div className="p-4 bg-gray-100">
                <p className="text-sm">Описание о нем</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;