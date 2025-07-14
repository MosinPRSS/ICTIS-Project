import React, { useState } from 'react';
import { MessageCircle, Users, Star, ArrowLeft, Share2, Flag, Settings } from 'lucide-react';
import { Bot } from '../types/interfaces';

interface BotInfoProps {
  bot: Bot;
}

const BotInfo: React.FC<BotInfoProps> = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  const botData = {
    name: "VIOLET2XX",
    subtitle: "DO YOU REFUSE",
    description: "We you rejected? You found a girl in an abandoned house, he was in terrible condition, and he was afraid to be touched. A very dark experience to touch Violence but he was afraid of touching people.",
    image: "/api/placeholder/400/600",
    author: "EXTREMES",
    messages: 229,
    rating: 4.5,
    interactions: 1250,
    tags: ["SA mention", "Trauma", "Fear", "Panic", "Anxiety", "Depression", "Self Harm", "PTSD"],
    categories: ["Психология", "Драма"],
    character: "Number 9"
  };

  const reviews = [
    { id: 1, user: "User1", rating: 5, text: "Отличный бот для проработки сложных тем" },
    { id: 2, user: "User2", rating: 4, text: "Хорошо написанный персонаж с глубокой историей" },
    { id: 3, user: "User3", rating: 5, text: "Помог разобраться с собственными переживаниями" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <div className="border-b border-purple-700/50 bg-purple-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-800/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">{botData.character}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-purple-800/50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-800/50 rounded-lg transition-colors">
              <Flag className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-800/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bot Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
              <div className="relative mb-6">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-purple-200">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-purple-500/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <MessageCircle className="w-12 h-12" />
                      </div>
                      <p className="text-sm opacity-75">Bot Avatar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{botData.name}</h2>
                <p className="text-purple-300 text-sm mb-4">{botData.subtitle}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-purple-300">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{botData.messages}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{botData.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{botData.interactions}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-purple-300 mb-2">Автор</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">E</span>
                    </div>
                    <span className="text-sm">{botData.author}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-purple-300 mb-2">Категории</h3>
                  <div className="flex flex-wrap gap-2">
                    {botData.categories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-700/50 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3 rounded-xl font-semibold transition-all duration-200">
                  Начать чат
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl border border-purple-700/50">
              {/* Tab Navigation */}
              <div className="border-b border-purple-700/50 p-6">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`pb-2 px-1 border-b-2 font-semibold transition-colors ${
                      activeTab === 'info'
                        ? 'border-purple-400 text-purple-300'
                        : 'border-transparent text-purple-500 hover:text-purple-300'
                    }`}
                  >
                    Информация
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 px-1 border-b-2 font-semibold transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-purple-400 text-purple-300'
                        : 'border-transparent text-purple-500 hover:text-purple-300'
                    }`}
                  >
                    Отзывы
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Описание</h3>
                      <p className="text-purple-200 leading-relaxed">
                        {botData.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Предупреждения</h3>
                      <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                        <p className="text-red-200 text-sm mb-3">
                          <strong>Внимание:</strong> Данный бот содержит контент для взрослых и затрагивает серьезные темы:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {botData.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-red-800/50 rounded text-xs text-red-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Дополнительная информация</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-900/50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-purple-300 mb-2">Статистика</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Сообщений:</span>
                              <span>{botData.messages}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Рейтинг:</span>
                              <span>{botData.rating}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Взаимодействий:</span>
                              <span>{botData.interactions}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-900/50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-purple-300 mb-2">Рекомендации</h4>
                          <div className="space-y-2 text-sm text-purple-200">
                            <p>• Подходит для ролевых игр</p>
                            <p>• Требует деликатного подхода</p>
                            <p>• Для пользователей 18+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Отзывы пользователей</h3>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm transition-colors">
                        Оставить отзыв
                      </button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-purple-900/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold">{review.user[0]}</span>
                              </div>
                              <span className="text-sm font-semibold">{review.user}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-purple-200">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotInfo;