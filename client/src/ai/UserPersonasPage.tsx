import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  User,
  Save,
  X,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRegister } from "../context/UserIsRegisteredContext";
import { UserPersonaWithSettings as Persona } from "../types/interfaces";
import UserPersonas from '../utils/userPersonas.json';

const EnhancedPersonasPage: React.FC = () => {
  const { theme } = useRegister();
  const [personas, setPersonas] = useState<Persona[]>(UserPersonas as Persona[]);

  const [isDelete, setDelete] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setIsEditing(false);
  };

  const handleEditPersona = () => {
    setIsEditing(true);
  };

  const handleSavePersona = () => {
    if (selectedPersona) {
      setPersonas((prev) =>
        prev.map((p) => (p.id === selectedPersona.id ? selectedPersona : p))
      );
      setIsEditing(false);
    }
  };

  const handleDeletePersona = (personaId: number) => {
    setPersonas((prev) => prev.filter((p) => p.id !== personaId));
    if (selectedPersona?.id === personaId) {
      setSelectedPersona(null);
    }
  };

  const handleCreatePersona = () => {
    const newPersona: Persona = {
      id: Date.now(),
      name: "Новая персона",
      description: "Описание новой персоны",
      personality: "Опишите характер персоны",
      avatar: "",
      isActive: false,
      settings: {
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: "Введите системный промпт для персоны",
      },
    };
    setPersonas((prev) => [...prev, newPersona]);
    setSelectedPersona(newPersona);
    setIsEditing(true);
  };

  return (
    <div
      className={`max-h-[95%] w-full $ absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10`}
    >
      {/* Main Content */}
      <div className="flex w-full">
        {/* Personas List */}
        <div className="w-96 bg-black/10 backdrop-blur-sm border-r border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Ваши персоны</h1>
            <button
              onClick={handleCreatePersona}
              className={`p-2 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-colors`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <p className="text-white/70 text-sm mb-6">
            Как к вам будут обращаться собеседники?
          </p>

          <div className="space-y-3 overflow-y-auto h-[85%]">
            {personas.map((persona) => (
              <div
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedPersona?.id === persona.id
                    ? "bg-purple-600/30 border border-purple-400/50"
                    : "bg-white/10 hover:bg-white/20 border border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center relative">
                    <span className="text-white font-semibold">
                      {persona.name[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {persona.name}
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      {persona.description}
                    </p>
                    {persona.isActive && (
                      <span className="text-green-400 text-xs">
                        По умолчанию
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persona Details */}
        <div className="flex p-8 w-full justify-center border-white/10 bg-black/10 backdrop-blur-sm border-r">
          {selectedPersona ? (
            <div className="max-w-4xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center relative">
                    <span className="text-white text-xl font-bold">
                      {selectedPersona.name[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {selectedPersona.name}
                    </h2>
                    <p className="text-white/70">
                      {selectedPersona.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSavePersona}
                        className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Сохранить
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Отмена
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditPersona}
                      className="px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Редактировать персону
                    </button>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80%]">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Имя персоны
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedPersona.name}
                        onChange={(e) =>
                          setSelectedPersona({
                            ...selectedPersona,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">
                        {selectedPersona.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Описание
                    </label>
                    {isEditing ? (
                      <textarea
                        value={selectedPersona.description}
                        onChange={(e) =>
                          setSelectedPersona({
                            ...selectedPersona,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">
                        {selectedPersona.description}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Характер и личность
                    </label>
                    {isEditing ? (
                      <textarea
                        value={selectedPersona.personality}
                        onChange={(e) =>
                          setSelectedPersona({
                            ...selectedPersona,
                            personality: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-white">
                        {selectedPersona.personality}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Аватар
                    </label>
                    {isEditing ? (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white/50" />
                        </div>
                        <button className="px-4 cursor-pointer py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                          Загрузить изображение
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            {selectedPersona.name[0]}
                          </span>
                        </div>
                        <span className="text-white/60">
                          Стандартный аватар
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-6 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Расширенные настройки
                    </h3>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex cursor-pointer items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                      {showAdvanced ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4 ml-2" />
                      )}
                      {showAdvanced ? "Скрыть" : "Показать"}
                    </button>
                  </div>

                  {showAdvanced && (
                    <>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Температура ({selectedPersona.settings.temperature})
                        </label>
                        <p className="text-white/60 text-sm mb-2">
                          Влияет на креативность ответов
                        </p>
                        {isEditing ? (
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={selectedPersona.settings.temperature}
                            onChange={(e) =>
                              setSelectedPersona({
                                ...selectedPersona,
                                settings: {
                                  ...selectedPersona.settings,
                                  temperature: parseFloat(e.target.value),
                                },
                              })
                            }
                            className="w-full"
                          />
                        ) : (
                          <div className="w-full bg-white/10 rounded-lg h-2">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
                              style={{
                                width: `${
                                  selectedPersona.settings.temperature * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Максимум токенов
                        </label>
                        <p className="text-white/60 text-sm mb-2">
                          Длина ответов
                        </p>
                        {isEditing ? (
                          <input
                            type="number"
                            value={selectedPersona.settings.maxTokens}
                            onChange={(e) =>
                              setSelectedPersona({
                                ...selectedPersona,
                                settings: {
                                  ...selectedPersona.settings,
                                  maxTokens: parseInt(e.target.value),
                                },
                              })
                            }
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                            min="100"
                            max="4000"
                          />
                        ) : (
                          <div className="p-3 bg-white/5 rounded-lg text-white">
                            {selectedPersona.settings.maxTokens}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Системный промпт
                        </label>
                        <p className="text-white/60 text-sm mb-2">
                          Базовые инструкции для персоны
                        </p>
                        {isEditing ? (
                          <textarea
                            value={selectedPersona.settings.systemPrompt}
                            onChange={(e) =>
                              setSelectedPersona({
                                ...selectedPersona,
                                settings: {
                                  ...selectedPersona.settings,
                                  systemPrompt: e.target.value,
                                },
                              })
                            }
                            rows={6}
                            className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none font-mono text-sm"
                          />
                        ) : (
                          <div className="p-3 bg-white/5 rounded-lg text-white font-mono text-sm whitespace-pre-wrap">
                            {selectedPersona.settings.systemPrompt}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">
                            Активная персона
                          </h4>
                          <p className="text-white/60 text-sm">
                            Использовать эту персону по умолчанию
                          </p>
                        </div>
                        {!selectedPersona.isActive ? (
                          <button
                            onClick={() => {
                              const updatedPersonas = personas.map((p) => ({
                                ...p,
                                isActive: p.id === selectedPersona.id,
                              }));
                              setPersonas(updatedPersonas);
                              setSelectedPersona({
                                ...selectedPersona,
                                isActive: true,
                              });
                            }}
                            className={`w-12 cursor-pointer h-6 rounded-full transition-colors ${
                              selectedPersona.isActive
                                ? "bg-green-500"
                                : "bg-white/20"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                selectedPersona.isActive
                                  ? "translate-x-6"
                                  : "translate-x-0.5"
                              }`}
                            ></div>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const updatedPersonas = personas.map((p) => ({
                                ...p,
                                isActive: p.id === selectedPersona.id,
                              }));
                              setPersonas(updatedPersonas);
                              setSelectedPersona({
                                ...selectedPersona,
                                isActive: false,
                              });
                            }}
                            className={`w-12 cursor-pointer h-6 rounded-full transition-colors ${
                              selectedPersona.isActive
                                ? "bg-green-500"
                                : "bg-white/20"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                selectedPersona.isActive
                                  ? "translate-x-6"
                                  : "translate-x-0.5"
                              }`}
                            ></div>
                          </button>
                        )}
                      </div>
                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          onClick={() =>
                            setDelete(true)
                          }
                          className="px-6 py-3 cursor-pointer bg-red-600/20 text-red-200 rounded-lg hover:bg-red-600/30 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Удалить персону
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <User className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Выберите персону
                </h3>
                <p className="text-white/60">
                  Выберите персону из списка для редактирования
                </p>
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
                    <h3 className="text-lg font-semibold text-white">Удалить персону?</h3>
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
                    onClick={() => { handleDeletePersona(selectedPersona.id); setDelete(false); setSelectedPersona(undefined); }}
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

export default EnhancedPersonasPage;
