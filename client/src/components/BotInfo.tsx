import React, { useEffect, useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { Bot } from '../types/interfaces';
import { useRegister } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import RegLog from './RegLog';

interface BotInfoProps {
  bot: Bot;
}

const BotInfo: React.FC<BotInfoProps> = ({ bot }) => {
  const { theme, isReg, wantRegFunc, wantToReg, pageFunc, page, setUserViewFunc } = useRegister();
  const navigate = useNavigate();
  const [pendingChat, setPendingChat] = useState(false);

  const handleChatClick = () => {
    if (!isReg) {
      wantRegFunc(true);
      setPendingChat(true);
    } else {
      navigate(`/chats?botId=${bot.id}`);
    }
  };

  // После успешной регистрации/логина — переход в чат
  useEffect(() => {
    if (isReg && pendingChat) {
      wantRegFunc(false);
      setPendingChat(false);
      pageFunc('/chats');
      navigate(`/chats?botId=${bot.id}`);
    }
  }, [isReg, pendingChat, bot.id, navigate, wantRegFunc, pageFunc]);

  return (
    <div className={`h-screen ${theme.options.bgColor} ${theme.options.textColor}`}>
      {wantToReg && <RegLog />}
      {/* Header */}


      <div className="max-w-6xl mx-auto px-2 mt-15 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bot Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className={`${theme.options.bgColor3} backdrop-blur-sm rounded-2xl p-6 border ${theme.options.bgBorderColor}`}>
              <div className="relative mb-6">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl overflow-hidden flex items-center justify-center">
                  {bot.image ? (
                    <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-200">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-purple-500/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <MessageCircle className="w-12 h-12" />
                        </div>
                        <p className="text-sm opacity-75">Bot Avatar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{bot.name}</h2>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-purple-300">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{bot.chatsCount}</span>
                  </div>
                  {bot.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{bot.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-purple-300 mb-2">Автор</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{bot.author?.[0]?.toUpperCase()}</span>
                    </div>
                    <button
                        className="text-purple-300 text-sm cursor-pointer"
                        onClick={() => {
                            setUserViewFunc(bot.author);
                            navigate('/userview');
                        }}
                        >
                        {bot.author}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-purple-300 mb-2">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {bot.tags && bot.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-700/50 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer`} onClick={handleChatClick}>
                 Чат
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <div className={`${theme.options.bgColor3} backdrop-blur-sm rounded-2xl border ${theme.options.bgBorderColor}`}>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Описание</h3>
                    <p className={`"text-purple-200 leading-relaxed"`}>
                      {bot.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Промт</h3>
                    <div className={`${theme.options.bgColor} rounded-lg p-4`}>
                      <p className="text-purple-200 text-sm mb-3">
                        {bot.promt || 'Нет промта'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Приветствие</h3>
                    <div className={`${theme.options.bgColor} rounded-lg p-4`}>
                      <p className="text-purple-200 text-sm mb-3">
                        {bot.hello || 'Нет приветствия'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Сценарий</h3>
                    <div className={`${theme.options.bgColor} rounded-lg p-4`}>
                      <p className="text-purple-200 text-sm mb-3">
                        {bot.scenario || 'Нет сценария'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotInfo;