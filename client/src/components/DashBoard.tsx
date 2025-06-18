import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, Placement, FloatingPortal } from '@floating-ui/react';
import Bots from "./Bots";
import CategoryFilter from "./CategoryFilter";
import {Categories} from "../utils/data";
import { useRegister } from "../context/UserIsRegisteredContext";
import { ChevronLeft, ChevronRight, Clock, Frown, Heart, MessageCircle, SearchIcon, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import BotsData from '../utils/data.json'
import { user } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import users from '../utils/users.json'   

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



const BotCard: React.FC<Bot> = ({ name, description, author, image, chatsCount, rating, isNew, isReg, tags }) => {
  const {setUserViewFunc, pageFunc} = useRegister()
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-start' as Placement,
    middleware: [
      offset(10),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  function redirect(){
    setUserViewFunc(users.find((user) => user.name == author))
    pageFunc('/userwiew')
    navigate('/userview')
  }

  return (
    <div 
      ref={refs.setReference}
      {...getReferenceProps()}
      className="relative flex-shrink-0 w-[200px] cursor-pointer"
    >
      <div className="bg-purple-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-700/20 hover:bg-purple-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="h-40">
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
            <button onClick={() => redirect()} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-purple-300 text-xs truncate max-w-[80px]">{author}</p>
            </button>
            
            <div className="flex items-center gap-1 text-purple-300">
              <MessageCircle size={14} />
              <span className="text-xs">{chatsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <FloatingPortal>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 w-[220px] bg-purple-900/95 backdrop-blur-sm border border-purple-600/30 rounded-lg p-4 shadow-xl"
        >
          <div className="space-y-3">
            <div>
              <p className="text-white font-semibold">{name}</p>
              {!isReg && <p className="text-purple-200 text-sm">Для общения необходимо зарегистрироваться</p>}
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

            <div>
              <p className="text-purple-300 text-sm font-medium">Теги</p>
              <div className="flex items-center flex-wrap gap-2 mt-1">
                {tags.map((tag, index) => (
                  <span key={index} className="border p-1 rounded-sm bg-purple-700/50 text-xs">
                    {tag}
                  </span>
                ))}
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
          </div>
        </div>
      </FloatingPortal>)}
    </div>
  );
};

const BotSection = ({ title, icon, bots, isReg }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
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
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pr-5"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          width: 'calc(100% - 20px)'
        }}
      >
        {bots.map((bot) => (
          <BotCard isReg={isReg} key={bot.id} {...bot} />
        ))}
      </div>
    </div>
  );
};


export function DashBoard() {
  const { theme, isReg } = useRegister();
  const [searchBot, setSearchBot] = useState('');
  const [findBots, setFindBots] = useState(BotsData);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => [...prev, category]);
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const handleResetAllCategories = () => {
    setSelectedCategories([]);
  };

  const find = () => {
    if (searchBot === '') {
      setFindBots(BotsData);
      return;
    }
    
    const filtered = BotsData.filter(bot => 
      bot.name.toLowerCase().includes(searchBot.toLowerCase())
    );
    setFindBots(filtered);
  };

  useEffect(() => {
    if (selectedCategories.length === 0 && searchBot === '') {
      setFindBots(BotsData);
      return;
    }

    let filtered = BotsData;
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(bot => 
        selectedCategories.every(tag => bot.tags.includes(tag))
      );
    }
    
    if (searchBot) {
      filtered = filtered.filter(bot => 
        bot.name.toLowerCase().includes(searchBot.toLowerCase())
      );
    }
    
    setFindBots(filtered);
  }, [selectedCategories, searchBot]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      find();
    }
  };

  return (
    <div className={`flex pt-12 px-3 flex-col h-full w-full ${theme.options.bgColor}`}>
      {/* Заголовок и поиск */}
      <div className="flex justify-between items-center py-7 px-7 w-full">
        <div>
          {isReg ? (
            <p className="text-3xl font-bold max-w-[300px]">Добро пожаловать, {user.name}!</p>
          ) : (
            <p className="text-3xl font-bold max-w-[300px]">Добро пожаловать!</p>
          )}
        </div>
        <div className="flex gap-2 mt-10">
          <Input
            value={searchBot}
            onChange={(e) => setSearchBot(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Найти персонажа"
            className={`w-[300px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}
          />
          <Button
            variant={"outline"}
            className={`cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}
            onClick={find}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-row pr-5">
        <CategoryFilter 
          categories={Categories} 
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onCategoryRemove={handleCategoryRemove}
          onResetAll={handleResetAllCategories}
        />
        
        <div className="flex-1 ml-5 mb-10 pr-5">
          {searchBot && findBots.length === 0 ? (
            <div className="flex w-full justify-center items-center gap-2 mt-20 text-xl text-purple-300">
              <p>Ничего не найдено</p>
              <Frown />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Персональные рекомендации */}
              {isReg && (
                <BotSection
                  title="Лично для вас"
                  icon={<Heart className="text-red-400" size={24} />}
                  bots={personalizedBots.filter(bot => 
                    selectedCategories.length === 0 || 
                    selectedCategories.every(tag => bot.tags.includes(tag))
                  )}
                  isReg={isReg}
                />
              )}

              {/* Популярные боты */}
              <BotSection
                title="Популярные"
                icon={<TrendingUp className="text-green-400" size={24} />}
                bots={popularBots.filter(bot => 
                  selectedCategories.length === 0 || 
                  selectedCategories.every(tag => bot.tags.includes(tag))
                )}
                isReg={isReg}
              />

              {/* Рекомендуемые */}
              <BotSection
                title="Рекомендуемые"
                icon={<Sparkles className="text-yellow-400" size={24} />}
                bots={recommendedBots.filter(bot => 
                  selectedCategories.length === 0 || 
                  selectedCategories.every(tag => bot.tags.includes(tag))
                )}
                isReg={isReg}
              />

              {/* Новые боты */}
              <BotSection
                title="Новинки"
                icon={<Clock className="text-blue-400" size={24} />}
                bots={newBots.filter(bot => 
                  selectedCategories.length === 0 || 
                  selectedCategories.every(tag => bot.tags.includes(tag))
                )}
                isReg={isReg}
              />

              {/* Трендовые боты */}
              <BotSection
                title="В тренде"
                icon={<Users className="text-purple-400" size={24} />}
                bots={trendingBots.filter(bot => 
                  selectedCategories.length === 0 || 
                  selectedCategories.every(tag => bot.tags.includes(tag))
                )}
                isReg={isReg}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}