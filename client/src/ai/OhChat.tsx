import React, { useState } from 'react';
import { Edit2, Trash2, UserPlus, Users } from 'lucide-react';
import { useRegister } from '../context/UserIsRegisteredContext';
import { useNavigate } from 'react-router-dom';

interface Subscription {
  id: string;
  username: string;
  email: string;
  avatar: string;
  subscribedAt: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    username: 'Qua11ra',
    email: 'm@example.com',
    description: 'Я грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай грушай груша'
  });

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      username: 'Alexandra_Dev',
      email: 'alex@example.com',
      avatar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      subscribedAt: '2024-03-15'
    },
    {
      id: '2',
      username: 'CodeMaster',
      email: 'code@example.com',
      avatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      subscribedAt: '2024-03-10'
    },
    {
      id: '3',
      username: 'TechGuru',
      email: 'tech@example.com',
      avatar: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      subscribedAt: '2024-03-05'
    },
    {
      id: '4',
      username: 'DataScientist',
      email: 'data@example.com',
      avatar: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      subscribedAt: '2024-02-28'
    },
    {
      id: '5',
      username: 'UIDesigner',
      email: 'ui@example.com',
      avatar: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      subscribedAt: '2024-02-20'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const {theme, pageFunc, regFunc} = useRegister()
  const navigate = useNavigate()

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="w-full mb-10 p-6 mt-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Удалить аккаунт?</h3>
                    <p className="text-sm text-gray-400">Это действие нельзя отменить</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={() => {regFunc(false); pageFunc('/'); navigate('/')}}
                    className="flex-1 cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        {/* Профиль */}
        <div className={`backdrop-blur-sm rounded-2xl p-8 ${theme.options.bgColor3}`}>
          <h1 className="text-3xl font-bold text-white mb-8">Профиль</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Аватар */}
            <div className="flex-shrink-0">
              <div 
                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)'
                }}
              >
                <span className="text-white text-2xl font-bold">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-purple-300 text-center mt-2 text-sm">
                {profile.username} ({profile.email})
              </p>
            </div>

            {/* Информация профиля */}
            <div className="flex-1 space-y-6">
              {!isEditing ? (
                <>
                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      Имя пользователя
                    </label>
                    <div className={`${theme.options.mgColor} rounded-lg p-3 text-white`}>
                      {profile.username}
                    </div>
                  </div>

                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      Описание
                    </label>
                    <div className={`${theme.options.mgColor} rounded-lg p-3 text-white min-h-[80px]`}>
                      {profile.description}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                      Изменить профиль
                    </button>
                    <button onClick={() => setShowDeleteConfirm(true)} className="flex cursor-pointer items-center gap-2 bg-red-600/80 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200">
                      <Trash2 size={16} />
                      Удалить профиль
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      Имя пользователя
                    </label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className={`w-full ${theme.options.mgColor} rounded-lg p-3 text-white border ${theme.options.bgBorderColor} focus:border-purple-400 focus:outline-none transition-colors`}
                    />
                  </div>

                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      Описание
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={4}
                      className={`w-full ${theme.options.mgColor} rounded-lg p-3 text-white border ${theme.options.bgBorderColor} focus:border-purple-400 focus:outline-none transition-colors resize-none`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Подписки */}
        <div className={`${theme.options.bgColor3} backdrop-blur-sm rounded-2xl p-8 ${theme.options.bgBorderColor}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users size={28} />
              Подписки
              <span className="text-purple-300 text-lg font-normal">
                ({subscriptions.length})
              </span>
            </h2>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
              <UserPlus size={16} />
              Найти авторов
            </button>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="text-purple-400 mx-auto mb-4" />
              <p className="text-purple-300 text-lg mb-2">У вас пока нет подписок</p>
              <p className="text-purple-400 text-sm">Найдите интересных авторов и подпишитесь на них</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`${theme.options.mgColor} rounded-xl p-4 ${theme.options.bgBorderColor} hover:bg-purple-900/60 transition-all duration-200 hover:scale-105`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: sub.avatar }}
                    >
                      {sub.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {sub.username}
                      </h3>
                      <p className="text-purple-300 text-sm truncate">
                        {sub.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-xs">
                      Подписка: {new Date(sub.subscribedAt).toLocaleDateString('ru-RU')}
                    </span>
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                      Отписаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;