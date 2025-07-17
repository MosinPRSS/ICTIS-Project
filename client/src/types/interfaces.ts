import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export interface Bot {
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
  promt?: string;
  hello?: string;
  scenario?: string;
}

export interface BotGridSectionProps {
  title: string;
  icon: React.ReactNode;
  bots: Bot[];
  isReg: boolean;
}

export interface ChatProps {
  chat: number;
  chatFunc: Dispatch<SetStateAction<number>>;
}

export interface CollapseProps {
  isCollapsed: boolean;
  collapseFunc: Dispatch<React.SetStateAction<boolean>>;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onCategoryRemove: (category: string) => void;
  onResetAll: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  description?: string;
  bots?: Bot[];
  personas?: Persona[];
}

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
  isPublic?: boolean;
}

// Component Props Interfaces
export interface ChatsSetProps {
  bot: Bot;
  isChatFunc: (value: boolean) => void;
  setChatFunc: (chat: string) => void;
}

export interface UserPersona {
  name: string;
  id: number;
  description: string;
  image: string;
}

export interface LikedBot {
  id: string;
  name: string;
  description: string;
  image: string;
  likes: number;
  messages: number;
  category: string;
  tags: string[];
}

export interface UserBot {
  name: string;
  id: number;
  description: string;
  promt: string;
  hello: string;
  scenario: string;
  isPublic: boolean;
  chatsCount: number;
  image: string;
  tags: string[];
}

export interface ChatsListProps {
  isChatsFunc: (value: boolean) => void;
}

export interface BotInfoProps {
  bot: Bot;
}

export interface ChatProps {
  bot: Bot;
}

// AI Chat Interfaces
export interface ChatBot {
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

export interface Chat {
  id: string;
  name: string;
  botId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export interface ChatItemProps {
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

// User Bots Interfaces
export interface UserBotSettings {
  temperature: number;
  maxTokens: number;
  isPublic: boolean;
}

export interface UserBotWithSettings {
  id: number;
  name: string;
  description: string;
  category: string;
  avatar: string;
  settings: UserBotSettings;
}

// User Personas Interfaces
export interface UserPersonaWithSettings {
  id: number;
  name: string;
  description: string;
  personality: string;
  avatar: string;
  isActive: boolean;
  settings: {
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
  };
}

// Subscription Interface
export interface Subscription {
  id: string;
  username: string;
  email: string;
  avatar: string;
  subscribedAt: string;
}

// Dashboard Bot Interface
export interface DashboardBot {
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

export interface BotSectionProps {
  title: string;
  icon: React.ReactNode;
  bots: DashboardBot[];
  viewAllLink?: string;
}

// Enhanced Bot Interface
export interface EnhancedBot {
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