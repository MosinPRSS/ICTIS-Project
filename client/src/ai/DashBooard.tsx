import CategoryFilter from "./CategoryFilter";
import { Categories } from "../utils/data";
import { useRegister } from "../context/UserIsRegisteredContext";
import { ChevronLeft, ChevronRight, Clock, Frown, Heart, MessageCircle, SearchIcon, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import BotsData from '../utils/data.json';
import { user } from "../utils/data";

interface Bot {
  id: string;
  name: string;
  description: string;
  author: string;
  image: string;
  chatsCount: number;
  tags: string[];
  rating?: number;
  isNew?: boolean;
  isPopular?: boolean;
  lastActive?: string;
}

interface BotSectionProps {
  title: string;
  icon: React.ReactNode;
  bots: Bot[];
  viewAllLink?: string;
}

const BotCard: React.FC<Bot> = ({ name, description, author, image, chatsCount, rating, isNew, tags }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'left' | 'right'>('right');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    
    // Определяем позицию тултипа
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const tooltipWidth = 220;
      
      // Если карточка близко к правому краю, показываем тултип слева
      if (rect.right + tooltipWidth + 20 > screenWidth) {
        setTooltipPosition('left');
      } else {
        setTooltipPosition('right');
      }
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative flex-shrink-0 w-[200px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="bg-purple-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-700/20 hover:bg-purple-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative h-40">
          <img className="h-full w-full object-cover" src={image} alt={name} />
          {isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              NEW
            </div>
          )}
          {rating && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star size={12} fill="white" />
              {rating}
            </div>
          )}
        </div>
        
        <div className="p-3 bg-purple-900/40">
          <div className="mb-2">
            <p className="text-white text-sm font-semibold truncate">{name}</p>
            <p className="text-purple-300 text-xs line-clamp-2 h-8">{description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-purple-300 text-xs truncate max-w-[80px]">{author}</p>
            </div>
            
            <div className="flex items-center gap-1 text-purple-300">
              <MessageCircle size={14} />
              <span className="text-xs">{chatsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {showTooltip && (
        <div 
          className={`absolute top-0 w-[220px] bg-purple-900/95 backdrop-blur-sm border border-purple-600/30 rounded-lg p-4 shadow-xl z-50 ${
            tooltipPosition === 'left' ? 'right-full mr-2' : 'left-full ml-2'
          }`}
        >
          <div className="space-y-3">
            <div>
              <p className="text-white font-semibold">{name}</p>
              <p className="text-purple-300 text-sm">{description}</p>
            </div>
            
            <div>
              <p className="text-purple-300 text-sm font-medium">Автор</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-white text-sm">{author}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-purple-300">
                <MessageCircle size={14} />
                <span>{chatsCount} чатов</span>
              </div>
              {rating && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span>{rating}</span>
                </div>
              )}
            </div>

            {/* Теги */}
            {tags && tags.length > 0 && (
              <div>
                <p className="text-purple-300 text-sm font-medium mb-2">Теги</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-700/50 text-purple-200 text-xs rounded-full border border-purple-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const BotSection: React.FC<BotSectionProps> = ({ title, icon, bots, viewAllLink }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220; // ширина карточки + отступ
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <span className="text-purple-300 text-sm">({bots.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <button className="text-purple-300 hover:text-white text-sm transition-colors">
              Смотреть все
            </button>
          )}
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-300 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-300 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pr-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingRight: '16px' // Добавляем padding справа
        }}
      >
        {bots.map((bot) => (
          <BotCard key={bot.id} {...bot} />
        ))}
      </div>
    </div>
  );
};

const CategoryFilter: React.FC<{ categories: string[]; selectedCategories: string[] }> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-64 mr-6">
      <h3 className="text-white font-semibold mb-4">Категории</h3>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Найти категорию"
          className="w-full px-3 py-2 bg-purple-900/50 border border-purple-600/30 rounded-lg text-white placeholder-purple-400 focus:border-purple-400 focus:outline-none"
        />
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImprovedBotsPage: React.FC = () => {
  const [searchBot, setSearchBot] = useState('');
  const [findBots, setFindBots] = useState<Bot[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const isReg = true; // Предполагаем, что пользователь зарегистрирован
  const user = { name: 'Qua11ra' };

  // Все боты для поиска
  const allBots: Bot[] = [];

  // Моковые данные для разных категорий ботов
  const personalizedBots: Bot[] = Array.from({ length: 8 }, (_, i) => ({
    id: `personal-${i}`,
    name: `Персональный бот ${i + 1}`,
    description: `Специально подобранный для вас бот с уникальными возможностями и интересными функциями`,
    author: `author ${i + 1}`,
    image: '/api/placeholder/200/160',
    chatsCount: Math.floor(Math.random() * 1000) + 100,
    tags: ['персональный', 'рекомендуемый'],
    rating: (4 + Math.random()).toFixed(1),
    isNew: i < 2
  }));

  const popularBots: Bot[] = Array.from({ length: 8 }, (_, i) => ({
    id: `popular-${i}`,
    name: `Популярный бот ${i + 1}`,
    description: `Один из самых популярных ботов с высоким рейтингом и множеством активных пользователей`,
    author: `popular_author ${i + 1}`,
    image: '/api/placeholder/200/160',
    chatsCount: Math.floor(Math.random() * 5000) + 1000,
    tags: ['популярный', 'топ'],
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    isPopular: true
  }));

  const recommendedBots: Bot[] = Array.from({ length: 8 }, (_, i) => ({
    id: `recommended-${i}`,
    name: `Рекомендуемый бот ${i + 1}`,
    description: `Рекомендуемый бот на основе ваших предпочтений и активности в приложении`,
    author: `rec_author ${i + 1}`,
    image: '/api/placeholder/200/160',
    chatsCount: Math.floor(Math.random() * 2000) + 500,
    tags: ['рекомендуемый', 'новый'],
    rating: (4.2 + Math.random() * 0.6).toFixed(1)
  }));

  const newBots: Bot[] = Array.from({ length: 6 }, (_, i) => ({
    id: `new-${i}`,
    name: `Новый бот ${i + 1}`,
    description: `Недавно добавленный бот с современными функциями и возможностями`,
    author: `new_author ${i + 1}`,
    image: '/api/placeholder/200/160',
    chatsCount: Math.floor(Math.random() * 500) + 10,
    tags: ['новый', 'свежий'],
    isNew: true,
    lastActive: 'Сегодня'
  }));

  const trendingBots: Bot[] = Array.from({ length: 6 }, (_, i) => ({
    id: `trending-${i}`,
    name: `Трендовый бот ${i + 1}`,
    description: `Бот, который сейчас на пике популярности и активно обсуждается сообществом`,
    author: `trend_author ${i + 1}`,
    image: '/api/placeholder/200/160',
    chatsCount: Math.floor(Math.random() * 3000) + 800,
    tags: ['тренды', 'актуальный'],
    rating: (4.3 + Math.random() * 0.5).toFixed(1)
  }));

  // Объединяем все боты для поиска
  allBots.push(...personalizedBots, ...popularBots, ...recommendedBots, ...newBots, ...trendingBots);

  const categories = [
    'Кухня', 'Природа', 'Увлечения', 'Страшилки', 'Психолог',
    'Школа', 'Игры', 'Путешествия', 'Веселье', 'Животные',
    'Наука', 'Спорт', 'Музыка', 'Фильмы', 'Книги'
  ];

  const handleSearch = () => {
    if (!searchBot.trim()) {
      setFindBots([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchLower = searchBot.toLowerCase();
    const filtered = allBots.filter(bot =>
      bot.name.toLowerCase().includes(searchLower) ||
      bot.description.toLowerCase().includes(searchLower) ||
      bot.author.toLowerCase().includes(searchLower) ||
      bot.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    
    setFindBots(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Обработка изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchBot(value);
    
    if (!value.trim()) {
      setFindBots([]);
      setIsSearching(false);
    }
  };

  return (
    <div className="flex pt-12 px-3 flex-col h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen max-w-full overflow-hidden">
      {/* Заголовок и поиск */}
      <div className="justify-between flex flex-row py-7 px-7 w-full max-w-full">
        <div className="flex-shrink-0">
          {isReg ? (
            <p className="text-3xl font-bold max-w-[300px] text-white">
              Добро пожаловать, {user.name}!
            </p>
          ) : (
            <p className="text-3xl font-bold max-w-[300px] text-white">
              Добро пожаловать!
            </p>
          )}
        </div>
        
        <div className="flex flex-row gap-2 mt-10 flex-shrink-0">
          <input
            value={searchBot}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Найти персонажа"
            className="w-[300px] px-4 py-2 bg-purple-900/50 border border-purple-600/30 rounded-lg text-white placeholder-purple-400 focus:border-purple-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-700/50 hover:bg-purple-600/50 border border-purple-600/30 rounded-lg text-white transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-row max-w-full overflow-hidden">
        <CategoryFilter categories={categories} selectedCategories={[]} />
        
        <div className="flex flex-col w-full mr-5 mb-10 min-w-0 overflow-hidden">
          {isSearching && searchBot ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Результаты поиска "{searchBot}" ({findBots.length})
              </h2>
              {findBots.length === 0 ? (
                <div className="flex w-full justify-center items-center gap-2 mt-20 text-xl text-purple-300">
                  <p>Ничего не найдено</p>
                  <Frown />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto max-h-[calc(100vh-300px)] pr-4">
                  {findBots.map((bot) => (
                    <BotCard key={bot.id} {...bot} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
              {/* Персональные рекомендации */}
              {isReg && (
                <BotSection
                  title="Лично для вас"
                  icon={<Heart className="text-red-400" size={24} />}
                  bots={personalizedBots}
                  viewAllLink="/personal"
                />
              )}

              {/* Популярные боты */}
              <BotSection
                title="Популярные"
                icon={<TrendingUp className="text-green-400" size={24} />}
                bots={popularBots}
                viewAllLink="/popular"
              />

              {/* Рекомендуемые */}
              <BotSection
                title="Рекомендуемые"
                icon={<Sparkles className="text-yellow-400" size={24} />}
                bots={recommendedBots}
                viewAllLink="/recommended"
              />

              {/* Новые боты */}
              <BotSection
                title="Новинки"
                icon={<Clock className="text-blue-400" size={24} />}
                bots={newBots}
                viewAllLink="/new"
              />

              {/* Трендовые боты */}
              <BotSection
                title="В тренде"
                icon={<Users className="text-purple-400" size={24} />}
                bots={trendingBots}
                viewAllLink="/trending"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovedBotsPage;