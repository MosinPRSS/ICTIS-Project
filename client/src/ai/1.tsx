import React, { useState } from 'react';
import { Search, MessageCircle, Star, Users, Zap, Heart, Filter, Plus, Menu, User, Settings, HelpCircle } from 'lucide-react';

interface Bot {
  id: number;
  name: string;
  description: string;
  author: string;
  avatar: string;
  category: string;
  rating: number;
  chatCount: number;
  isOnline: boolean;
  tags: string[];
}

const EnhancedMainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Все', 'Кухня', 'Природа', 'Увлечения', 'Страшилки', 
    'Психолог', 'Школа', 'Игры', 'Путешествия', 'Веселье', 'Животные'
  ];

  const bots: Bot[] = [
    {
      id: 1,
      name: 'Bot 1',
      description: 'Бот для общения, игр, шуток и прочего',
      author: 'author 1',
      avatar: '/api/placeholder/60/60',
      category: 'Кухня',
      rating: 4.8,
      chatCount: 1250,
      isOnline: true,
      tags: ['дружелюбный', 'веселый']
    },
    {
      id: 2,
      name: 'Bot 2',
      description: 'Помощник по природе и экологии',
      author: 'author 2',
      avatar: '/api/placeholder/60/60',
      category: 'Природа',
      rating: 4.6,
      chatCount: 890,
      isOnline: false,
      tags: ['образовательный', 'природа']
    },
    {
      id: 3,
      name: 'Bot 3',
      description: 'Эксперт по хобби и увлечениям',
      author: 'author 3',
      avatar: '/api/placeholder/60/60',
      category: 'Увлечения',
      rating: 4.9,
      chatCount: 2100,
      isOnline: true,
      tags: ['креативный', 'вдохновляющий']
    },
    {
      id: 4,
      name: 'Bot 4',
      description: 'Рассказчик страшных историй',
      author: 'author 3',
      avatar: '/api/placeholder/60/60',
      category: 'Страшилки',
      rating: 4.4,
      chatCount: 675,
      isOnline: true,
      tags: ['мистика', 'истории']
    },
    {
      id: 5,
      name: 'Bot 5',
      description: 'Персональный психолог и консультант',
      author: 'author 4',
      avatar: '/api/placeholder/60/60',
      category: 'Психолог',
      rating: 4.7,
      chatCount: 1800,
      isOnline: false,
      tags: ['поддержка', 'мудрый']
    }
  ];

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || bot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ARI-ai</span>
        </div>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full p-3 text-white bg-purple-600/30 rounded-xl hover:bg-purple-600/40 transition-colors">
            <Plus className="w-5 h-5" />
            Создать бота
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <User className="w-5 h-5" />
            Создать персону
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" />
            Чаты
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            Ваши боты
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <User className="w-5 h-5" />
            Ваши персоны
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <HelpCircle className="w-5 h-5" />
            Нужна помощь?
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <span className="text-white text-sm">Qua11ra</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Добро пожаловать, <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Qua11ra!</span>
            </h1>
            <p className="text-white/70 text-lg">Выберите бота для общения или создайте своего</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Найти персонажа..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Фильтры
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Bots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBots.map((bot) => (
              <div
                key={bot.id}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Online indicator */}
                {bot.isOnline && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                )}

                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{bot.name[0]}</span>
                  </div>
                </div>

                {/* Bot Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{bot.name}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">{bot.description}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{bot.rating}</span>
                    <span className="text-white/50 text-sm">•</span>
                    <Users className="w-4 h-4 text-white/50" />
                    <span className="text-white/50 text-sm">{bot.chatCount}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {bot.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/20 text-white/80 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-purple-400 rounded-full"></div>
                  <span className="text-white/60 text-sm">{bot.author}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Чат
                  </button>
                  <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBots.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ничего не найдено</h3>
              <p className="text-white/60">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedMainPage;