import React, { useState } from 'react';
import { Plus, Edit2, Trash2, User, Settings, ArrowLeft, Save, X, Upload, Eye, EyeOff, Zap } from 'lucide-react';
import { FloatingPortal } from '@floating-ui/react';
import { Button } from '../components/ui/button';
import { useRegister } from '../context/UserIsRegisteredContext';

interface Bot {
  id: number;
  name: string;
  description: string;
  category: string;
  avatar: string;
  settings: {
    temperature: number;
    maxTokens: number;
    isPublic: boolean;
  };
}

const EnhancedBotsPage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([
    {
      id: 1,
      name: 'Ассистент по программированию',
      description: 'Помогает с написанием и оптимизацией кода',
      category: 'Разработка',
      avatar: '',
      settings: {
        temperature: 0.5,
        maxTokens: 2000,
        isPublic: false
      }
    },
    {
      id: 2,
      name: 'Маркетолог',
      description: 'Генерирует креативные маркетинговые идеи',
      category: 'Маркетинг',
      avatar: '',
      settings: {
        temperature: 0.8,
        maxTokens: 2500,
        isPublic: true
      }
    },
    {
      id: 3,
      name: 'Юридический консультант',
      description: 'Дает базовые юридические консультации',
      category: 'Юриспруденция',
      avatar: '',
      settings: {
        temperature: 0.3,
        maxTokens: 1500,
        isPublic: false
      }
    }
  ]);

  const {theme} = useRegister()
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isDelete, setDelete] = useState(false)

  const handleSelectBot = (bot: Bot) => {
    setSelectedBot(bot);
    setIsEditing(false);
    setAvatarPreview(null);
  };

  const handleEditBot = () => {
    setIsEditing(true);
  };

  const handleSaveBot = () => {
    if (selectedBot) {
      const updatedBot = avatarPreview 
        ? { ...selectedBot, avatar: avatarPreview }
        : selectedBot;
      
      setBots(prev => prev.map(b => b.id === updatedBot.id ? updatedBot : b));
      setSelectedBot(updatedBot);
      setIsEditing(false);
      setAvatarPreview(null);
    }
  };

  const handleDeleteBot = (botId: number) => {
    setBots(prev => prev.filter(b => b.id !== botId));
    if (selectedBot?.id === botId) {
      setSelectedBot(null);
    }
  };

  const handleCreateBot = () => {
    const newBot: Bot = {
      id: Date.now(),
      name: 'Новый бот',
      description: 'Описание вашего бота',
      category: 'Другое',
      avatar: '',
      settings: {
        temperature: 0.7,
        maxTokens: 2000,
        isPublic: false
      }
    };
    setBots(prev => [...prev, newBot]);
    setSelectedBot(newBot);
    setIsEditing(true);
    setAvatarPreview(null);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleTogglePublic = () => {
    
    if (selectedBot) {
      setSelectedBot({
        ...selectedBot,
        settings: {
          ...selectedBot.settings,
          isPublic: !selectedBot.settings.isPublic
        }
      });
    }
  };

  return (
    <div className={`max-h-[95%] absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10`}>
      {/* Main Content */}
      <div className="flex w-full">
        {/* Bots List */}
        <div className="w-96 bg-black/10 backdrop-blur-sm border-r border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Ваши боты</h1>
            <button
              onClick={handleCreateBot}
              className="p-2 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <p className="text-white/70 text-sm mb-6">
            Создавайте и настраивайте своих чат-ботов
          </p>

          <div className="space-y-3 overflow-y-auto h-[85%]">
            {bots.map((bot) => (
              <div
                key={bot.id}
                onClick={() => handleSelectBot(bot)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedBot?.id === bot.id
                    ? 'bg-purple-600/30 border border-purple-400/50'
                    : 'bg-white/10 hover:bg-white/20 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center relative overflow-hidden">
                    {bot.avatar ? (
                      <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-semibold">{bot.name[0]}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{bot.name}</h3>
                    <p className="text-white/60 text-sm truncate">{bot.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">{bot.category}</span>
                      {bot.settings.isPublic && (
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 rounded-full">Публичный</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDelete(true);
                    }}
                    className="p-1 cursor-pointer text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bot Details */}
        <div className="flex p-8 w-full justify-center border-white/10 bg-black/10 backdrop-blur-sm border-r">
          {selectedBot ? (
            <div className="max-w-4xl w-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {avatarPreview || selectedBot.avatar ? (
                      <img 
                        src={avatarPreview || selectedBot.avatar} 
                        alt={selectedBot.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">{selectedBot.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedBot.name}</h2>
                    <p className="text-white/70">{selectedBot.description}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveBot}
                        className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Сохранить
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setAvatarPreview(null);
                        }}
                        className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Отмена
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditBot}
                      className="px-4 py-2 cursor-pointer w-53 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Редактировать бота
                    </button>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80%]">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Имя бота</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedBot.name}
                        onChange={(e) => setSelectedBot({...selectedBot, name: e.target.value})}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">{selectedBot.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Описание</label>
                    {isEditing ? (
                      <textarea
                        value={selectedBot.description}
                        onChange={(e) => setSelectedBot({...selectedBot, description: e.target.value})}
                        rows={3}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">{selectedBot.description}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Категория</label>
                    {isEditing ? (
                      <select
                        value={selectedBot.category}
                        onChange={(e) => setSelectedBot({...selectedBot, category: e.target.value})}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      >
                        <option value="Разработка">Разработка</option>
                        <option value="Маркетинг">Маркетинг</option>
                        <option value="Юриспруденция">Юриспруденция</option>
                        <option value="Образование">Образование</option>
                        <option value="Другое">Другое</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">{selectedBot.category}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Аватар</label>
                    {isEditing ? (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden">
                          {avatarPreview ? (
                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="w-6 h-6 text-white/50" />
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors cursor-pointer block"
                          >
                            {avatarPreview ? 'Изменить' : 'Загрузить'}
                          </label>
                          {avatarPreview && (
                            <button
                              onClick={() => setAvatarPreview(null)}
                              className="mt-2 text-xs text-red-400 hover:text-red-300"
                            >
                              Удалить
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                          {selectedBot.avatar ? (
                            <img src={selectedBot.avatar} alt={selectedBot.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white text-xl font-bold">{selectedBot.name[0]}</span>
                          )}
                        </div>
                        <span className="text-white/60">
                          {selectedBot.avatar ? 'Загруженный аватар' : 'Стандартный аватар'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-6 overflow-y-auto">
                      




                      

                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Публичный бот</h4>
                            <p className="text-white/60 text-sm">Доступен другим пользователям</p>
                          </div>
                          {isEditing ? (
                            <button
                              onClick={handleTogglePublic}
                              className={`w-12 cursor-pointer h-6 rounded-full transition-colors ${
                                selectedBot.settings.isPublic ? 'bg-green-500' : 'bg-white/20'
                              }`}
                            >
                              <div className={`w-5 h-5  bg-white rounded-full transition-transform ${
                                selectedBot.settings.isPublic ? 'translate-x-6' : 'translate-x-0.5'
                              }`}></div>
                            </button>
                          ) : (
                            <div className={`w-12 h-6 rounded-full ${selectedBot.settings.isPublic ? 'bg-green-500' : 'bg-white/20'}`}>
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                selectedBot.settings.isPublic ? 'translate-x-6' : 'translate-x-0.5'
                              }`}></div>
                            </div>
                          )}
                        </div>
                      </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className='flex flex-col'>
                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          onClick={() => handleDeleteBot(selectedBot.id)}
                          className="px-6 py-3 cursor-pointer bg-red-600/20 text-red-200 rounded-lg hover:bg-red-600/30 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Удалить бота
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <Zap className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Выберите бота</h3>
                <p className="text-white/60">Выберите бота из списка для просмотра или редактирования</p>
                <button
                  onClick={handleCreateBot}
                  className="mt-4 px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Создать нового бота
                </button>
                
              </div>
            </div>
          )}
        </div>
        
      </div>
      {isDelete && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Удалить бота?</h3>
                    <p className="text-sm text-gray-400">Это действие нельзя отменить</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setDelete(false)}
                    className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {handleDeleteBot(selectedBot.id); setDelete(false)}}
                    className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default EnhancedBotsPage;