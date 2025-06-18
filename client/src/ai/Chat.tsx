import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Info, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  Star,
  Archive,
  Settings,
  MessageSquare,
  Bot,
  ChevronLeft,
  X,
  Check,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useRegister } from '../context/UserIsRegisteredContext';
import { useNavigate } from 'react-router-dom';

interface Bot {
  id: string;
  name: string;
  avatar: string;
  author: string;
  description: string;
  tags: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  messageCount: number;
}

interface Chat {
  id: string;
  name: string;
  botId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export let bots: Bot[] = [
    {
      id: '11',
      name: 'Bot 11',
      avatar: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=100&h=100&fit=crop&crop=face',
      author: 'author 6',
      description: 'Умный ассистент для решения различных задач',
      tags: ['Природа', 'Игры'],
      lastMessage: 'Здравствуй! Я твой виртуальный собеседник. О чём поговорим?',
      lastMessageTime: '2 мин назад',
      messageCount: 23
    },
    {
      id: '9',
      name: 'Bot 9',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      author: 'author 3',
      description: 'Креативный помощник для генерации идей',
      tags: ['Творчество', 'Идеи'],
      lastMessage: 'Давай создадим что-то удивительное!',
      lastMessageTime: '1 час назад',
      messageCount: 15
    },
    {
      id: '5',
      name: 'Bot 5',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
      author: 'author 2',
      description: 'Технический консультант',
      tags: ['Технологии', 'Программирование'],
      lastMessage: 'Рассмотрим вашу задачу подробнее',
      lastMessageTime: '3 часа назад',
      messageCount: 8
    }
];

const ChatInterface: React.FC = () => {
  const {theme, pageFunc, setAuthorFunc} = useRegister()
  const navigate = useNavigate()
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showChatList, setShowChatList] = useState(false);
  const [showBotInfo, setShowBotInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingChatName, setEditingChatName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [collapsed, setCollapsed] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Основной чат',
      botId: '11',
      messages: [
        {
          id: '1',
          content: 'Здравствуй! Я твой виртуальный собеседник. О чём поговорим?',
          isBot: true,
          timestamp: '14:32'
        }
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      isPinned: false
    },
    {
      id: '2',
      name: 'Рабочие вопросы',
      botId: '11',
      messages: [],
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      isPinned: true
    }
  ]);

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBotsChats = (botId: string) => {
    return chats.filter(chat => chat.botId === botId);
  };

  const createNewChat = (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Чат с ${bot?.name || 'ботом'}`,
      botId,
      messages: bot ? [{
        id: '1',
        content: bot.lastMessage || 'Здравствуйте! Как дела?',
        isBot: true,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
      }] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false
    };
    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat);
    setShowChatList(false);
    
    // Устанавливаем выбранного бота, если он еще не выбран
    if (!selectedBot || selectedBot.id !== botId) {
      const botToSelect = bots.find(b => b.id === botId);
      if (botToSelect) {
        setSelectedBot(botToSelect);
      }
    }
  };

  const updateChatName = (chatId: string, newName: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, name: newName } : chat
    ));
    setEditingChatId(null);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
  };

  function viewUser(author) {
        setAuthorFunc(author)
        localStorage.setItem('viewUser', author)
        pageFunc('/watchuserinfo')
        navigate('/watchuserinfo')
    }

  const togglePinChat = (chatId: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    ));
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: 'Спасибо за сообщение! Я обдумываю ответ...',
      isBot: true,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    };

    // Обновляем чат с новыми сообщениями и временем последнего обновления
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage, botResponse],
            updatedAt: new Date().toISOString()
          }
        : chat
    ));

    setMessageInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const deleteAllChatsWithBot = (botId: string) => {
    bots = bots.filter(bot => bot.id !== selectedBot?.id);
    if (selectedChat?.botId === botId) {
      setSelectedChat(null);
      setShowBotInfo(false)
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`flex h-full w-full ${theme.options.bgColor}`}>
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-22' : 'w-80'} bg-black/20 backdrop-blur-xl border-r border-white/10`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && <h1 className="text-2xl font-bold text-white">Чаты</h1>}
            <button onClick={() => setCollapsed((collapsed) => !collapsed)} className="p-2 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors">
              {collapsed ? <ArrowRight className="w-5 h-5 text-white" /> : <ArrowLeft className="w-5 h-5 text-white" />}
            </button>
          </div>

          {!collapsed && <><div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск ботов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 h-[72dvh] overflow-y-auto">
            {filteredBots.map((bot) => (
              <div
                key={bot.id}
                onClick={() => {
                  setSelectedBot(bot);
                  const botChats = getBotsChats(bot.id);
                  if (botChats.length === 0) {
                    // Если нет чатов, создаем новый
                    createNewChat(bot.id);
                  } else if (botChats.length === 1) {
                    // Если один чат, открываем его
                    setSelectedChat(botChats[0]);
                  } else {
                    // Если несколько чатов, открываем последний использованный
                    const lastUsedChat = botChats.sort((a, b) => 
                      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                    )[0];
                    setSelectedChat(lastUsedChat);
                  }
                }}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedBot?.id === bot.id
                    ? 'bg-purple-600/50 ring-2 ring-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <img
                    src={bot.avatar}
                    alt={bot.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400/30"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white truncate">{bot.name}</h3>
                    <span className="text-xs text-white/60">{bot.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-white/70 truncate">{bot.lastMessage}</p>
                </div>
              </div>
            ))}
          </div></>}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedBot && selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedBot.avatar}
                    alt={selectedBot.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-white">{selectedBot.name}</h2>
                    <p className="text-sm text-purple-300">{selectedChat.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowChatList(!showChatList)}
                    className="p-2 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setShowBotInfo((showBotInfo) => !showBotInfo)}
                    className="p-2 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Info className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {showChatList ? (
              <div className={`flex h-full w-full ${theme.options.bgColor}`}>
                <div className="w-96 bg-black/20 backdrop-blur-xl border-r border-white/10">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setShowChatList(false)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-white cursor-pointer" />
                      </button>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">Чаты с {selectedBot.name}</h2>
                        <p className="text-sm text-purple-300">{getBotsChats(selectedBot.id).length} чатов</p>
                      </div>
                    </div>

                    <button
                      onClick={() => createNewChat(selectedBot.id)}
                      className="w-full cursor-pointer flex items-center gap-3 p-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium mb-6"
                    >
                      <Plus className="w-5 h-5" />
                      Создать новый чат
                    </button>

                    <div className="space-y-4 h-[70dvh] overflow-y-auto">
                      {getBotsChats(selectedBot.id).filter(chat => chat.isPinned).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Закрепленные
                          </h3>
                          <div className="space-y-2">
                            {getBotsChats(selectedBot.id)
                              .filter(chat => chat.isPinned)
                              .map((chat) => (
                                <ChatItem
                                  key={chat.id}
                                  chat={chat}
                                  isSelected={selectedChat?.id === chat.id}
                                  onSelect={(chat) => {
                                    setSelectedChat(chat);
                                    setShowChatList(false);
                                  }}
                                  onEdit={setEditingChatId}
                                  onDelete={deleteChat}
                                  onTogglePin={togglePinChat}
                                  editingChatId={editingChatId}
                                  editingChatName={editingChatName}
                                  setEditingChatName={setEditingChatName}
                                  updateChatName={updateChatName}
                                />
                              ))}
                          </div>
                        </div>
                      )}

                      {getBotsChats(selectedBot.id).filter(chat => !chat.isPinned).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">
                            Все чаты
                          </h3>
                          <div className="space-y-2">
                            {getBotsChats(selectedBot.id)
                              .filter(chat => !chat.isPinned)
                              .map((chat) => (
                                <ChatItem
                                  key={chat.id}
                                  chat={chat}
                                  isSelected={selectedChat?.id === chat.id}
                                  onSelect={(chat) => {
                                    setSelectedChat(chat);
                                    setShowChatList(false);
                                  }}
                                  onEdit={setEditingChatId}
                                  onDelete={deleteChat}
                                  onTogglePin={togglePinChat}
                                  editingChatId={editingChatId}
                                  editingChatName={editingChatName}
                                  setEditingChatName={setEditingChatName}
                                  updateChatName={updateChatName}
                                />
                              ))}
                          </div>
                        </div>
                      )}

                      {getBotsChats(selectedBot.id).length === 0 && (
                        <div className="text-center py-8 text-white/60">
                          <MessageSquare className="w-12 h-12 mx-auto mb-3" />
                          <p>Пока нет чатов с этим ботом</p>
                          <p className="text-sm mt-1">Создайте первый чат!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Выберите чат для  общения</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-white/10 text-white'
                            : 'bg-purple-600 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Напишите сообщение..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-white/60">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-xl mb-2">Добро пожаловать в чаты!</p>
                      <p>Выберите бота из списка, чтобы начать общение</p>
                    </div>
                  </div>
        )}
      </div>
      {showBotInfo && selectedBot && 
        <div className="w-80 h-full bg-black/30 backdrop-blur-xl border-l border-white/10 relative">
          <div className="p-6 pt-16 h-full flex flex-col"> {/* Добавлен flex-col и h-full */}
            <div className="space-y-6 flex-1"> {/* Основной контент обернут в flex-1 */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-purple-400/30">
                  <img
                    src={selectedBot.avatar}
                    alt={selectedBot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedBot.name}</h3>
                <p className="text-purple-300">от <button onClick={() => viewUser(selectedBot.author)}>{selectedBot.author}</button></p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wide">Описание</h4>
                <p className="text-gray-300 leading-relaxed">{selectedBot.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">Теги</h4>
                <div className="flex flex-wrap max-h-[30dvh] overflow-y-auto gap-2">
                  {selectedBot.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm border border-purple-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопка удаления теперь всегда внизу */}
            <div className="pt-4 border-t border-white/10 mt-auto"> {/* Добавлен mt-auto */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={getBotsChats(selectedBot.id).length === 0}
                className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 text-red-300 hover:text-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Удалить все чаты ({getBotsChats(selectedBot.id).length})
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Это действие нельзя отменить
              </p>
            </div>
          </div>
        </div>
      }
            {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Удалить все чаты?</h3>
                  <p className="text-sm text-gray-400">Это действие нельзя отменить</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                Вы уверены, что хотите удалить чат с <span className="font-semibold text-white">{selectedBot.name}</span>? 
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={() => deleteAllChatsWithBot(selectedBot.id)}
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

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chat: Chat) => void;
  onEdit: (chatId: string) => void;
  onDelete: (chatId: string) => void;
  onTogglePin: (chatId: string) => void;
  editingChatId: string | null;
  editingChatName: string;
  setEditingChatName: (name: string) => void;
  updateChatName: (chatId: string, name: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onTogglePin,
  editingChatId,
  editingChatName,
  setEditingChatName,
  updateChatName
}) => {
  const isEditing = editingChatId === chat.id;

  const handleEdit = () => {
    setEditingChatName(chat.name);
    onEdit(chat.id);
  };

  const handleSave = () => {
    updateChatName(chat.id, editingChatName);
  };

  const handleCancel = () => {
    onEdit('');
    setEditingChatName('');
  };

  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-purple-600/50 ring-2 ring-purple-400/50' : 'bg-white/5 hover:bg-white/10'
      }`}
      onClick={() => !isEditing && onSelect(chat)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {chat.isPinned && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
          {isEditing ? (
            <input
              type="text"
              value={editingChatName}
              onChange={(e) => setEditingChatName(e.target.value)}
              className="flex-1 bg-transparent border-b border-white/30 text-white focus:outline-none focus:border-purple-400"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
          ) : (
            <span className="text-white font-medium truncate">{chat.name}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 rounded cursor-pointer text-green-400 hover:bg-white/10"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 rounded cursor-pointer text-red-400 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin(chat.id);
                }}
                className="p-1 rounded cursor-pointer text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Star className={`w-4 h-4 ${chat.isPinned ? 'fill-current text-yellow-400' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="p-1 rounded cursor-pointer text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chat.id);
                }}
                className="p-1 rounded cursor-pointer text-white/60 hover:bg-white/10 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="flex items-center justify-between mt-2 text-xs text-white/60">
          <span>{chat.messages.length} сообщений</span>
          <span>{new Date(chat.updatedAt).toLocaleDateString('ru')}</span>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;