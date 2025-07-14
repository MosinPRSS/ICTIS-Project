import { useState } from 'react';
import { User, Mail, Calendar, Bot, Heart, MessageCircle, Share2 } from 'lucide-react';
import users from '../utils/users.json'
import { useRegister } from '../context/UserIsRegisteredContext';
import { LikedBot } from '../types/interfaces';

  const likedBots: LikedBot[] = [
    {
      id: '5',
      name: 'Ария',
      description: 'Певица с ангельским голосом, которая создает музыку, способную исцелить душу и поднять настроение.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
      likes: 5247,
      messages: 22150,
      category: 'Музыка',
      tags: ['Певица', 'Творчество', 'Вдохновение']
    },
    {
      id: '6',
      name: 'Викториа',
      description: 'Строгая, но справедливая учительница, которая поможет освоить любой предмет и достичь академических высот.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop',
      likes: 1876,
      messages: 9432,
      category: 'Образование',
      tags: ['Учитель', 'Строгая', 'Знания']
    }
  ];

export default function UserViewInfo() {
    const [activeTab, setActiveTab] = useState('bots');
    const {userview} = useRegister()
    const user = users.find(u => u.name === userview)
    const userBots = user?.bots || []

    const currentBots = activeTab === 'bots' ? userBots : likedBots;

    return (
        <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10">
        <div className="max-w-7xl px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Левая колонка - Профиль пользователя */}
            <div className="lg:w-80 lg:flex-shrink-0">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-8">
                <div className="relative mb-6 text-center">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-40 h-40 rounded-full border-4 border-purple-500/50 shadow-2xl mx-auto"
                    />
                </div>

                {/* Информация о пользователе */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                    <p className="text-purple-300 text-base mb-4">{user?.name}</p>
                    
                </div>

                {/* Контактная информация */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Присоединился</span>
                    </div>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xl font-bold text-white">много</div>
                        <div className="text-xs text-gray-400">Подписчиков</div>
                    </div>
                    <div className="text-center bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xl font-bold text-purple-400">много</div>
                        <div className="text-xs text-gray-400">Ботов</div>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3">
                    <button className="w-full py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />
                        Подписаться
                    </button>
                    <button className="w-full py-3 cursor-pointer bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Поделиться
                    </button>
                </div>
                </div>
            </div>

            {/* Правая колонка - Боты */}
            <div className="flex-1">
                {/* Вкладки */}
                <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('bots')}
                    className={`cursor-pointer px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'bots'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                    }`}
                >
                    <Bot className="w-4 h-4" />
                    Все боты ({userBots?.length})
                </button>
                <button
                    onClick={() => setActiveTab('liked')}
                    className={`cursor-pointer px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'liked'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                    }`}
                >
                    <Heart className="w-4 h-4" />
                    Понравившиеся ({likedBots.length})
                </button>
                </div>

                {/* Сетка ботов */}
                <div className="flex flex-row flex-wrap space-x-[5px] space-y-[5px]">
                {currentBots.map((bot) => (
                    <div
                    key={bot.id}
                    className="bg-slate-800/50 backdrop-blur-sm w-[200px] rounded-xl border border-white/10 overflow-hidden hover:scale-105 transition-all duration-300 hover:border-purple-500/50 group cursor-pointer"
                    >
                    {/* Изображение */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                        src={bot.image}
                        alt={bot.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Статистика поверх изображения */}
                        <div className="absolute bottom-3 left-3 flex gap-3">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                            <Heart className="w-3 h-3 text-pink-400" />
                            <span className="text-xs text-white font-medium">1</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                            <MessageCircle className="w-3 h-3 text-blue-400" />
                            <span className="text-xs text-white font-medium">2</span>
                        </div>
                        </div>
                    </div>

                    {/* Контент */}
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                            {bot.name}
                        </h3>
                        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                            o
                        </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3 line-clamp-3 leading-relaxed">
                        {bot.description}
                        </p>

                        {/* Теги */}
                        <div className="flex flex-wrap gap-1 mb-3">
                        {bot.tags.slice(0, 3).map((tag, index) => (
                            <span
                            key={index}
                            className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded-full"
                            >
                            {tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Пустое состояние */}
                {currentBots.length === 0 && (
                <div className="text-center py-16">
                    <Bot className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    {activeTab === 'bots' ? 'Пока нет созданных ботов' : 'Нет понравившихся ботов'}
                    </h3>
                    <p className="text-gray-500">
                    {activeTab === 'bots' 
                        ? 'Создайте своего первого бота, чтобы начать!' 
                        : 'Поставьте лайк ботам, которые вам нравятся'
                    }
                    </p>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};