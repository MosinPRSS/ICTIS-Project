import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  FloatingPortal,
} from "@floating-ui/react";
import CategoryFilter from "./CategoryFilter";
import { Categories } from "../utils/data";
import { useRegister } from "../context/UserIsRegisteredContext";
import {
  Clock,
  Frown,
  MessageCircle,
  SearchIcon,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import BotsData from "../utils/data.json";
import { Bot } from "../types/interfaces";
import { user } from "../utils/data";
import { useNavigate } from "react-router-dom";
import users from "../utils/users.json";

const BotCard: React.FC<Bot> = ({
  name,
  description,
  author,
  image,
  chatsCount,
  rating,
  isNew,
  isReg,
  tags,
}) => {
  const { setUserViewFunc, pageFunc } = useRegister();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start" as Placement,
    middleware: [
      offset(10),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const {theme} = useRegister()
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  function redirect() {
    setUserViewFunc(users.find((user) => user.name == author));
    pageFunc("/userwiew");
    navigate("/userview");
  }

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className="relative flex-shrink-0 h-40 transition-transform duration-300 hover:scale-105 hover:z-20"
    >
      <div className={`${theme.options.bgColor3} backdrop-blur-sm rounded-lg overflow-hidden min-w-[190px] ${theme.options.bgBorderColor} transition-all duration-300 hover:shadow-xl`}>
        <button className="h-40 w-full cursor-pointer" onClick={() => navigate(`/bot/${id}`)}>
          <img className="h-full w-full object-cover" src={image} alt={name} />
        </button>

        <div className={`p-3 ${theme.options.bgColor3}`}>
          <div className="mb-2">
            <p className="text-white text-sm font-semibold truncate">{name}</p>
            <p className="text-purple-300 text-xs line-clamp-2 h-8">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => redirect()}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-purple-300 text-xs truncate max-w-[80px] cursor-pointer">
                {author}
              </p>
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
            className={`z-50 w-[220px] ${theme.options.bgColor3} backdrop-blur-sm border ${theme.options.bgBorderColor} rounded-lg p-4 shadow-xl`}
          >
            <div className="space-y-3">
              <div>
                <p className="text-white font-semibold">{name}</p>
                {!isReg && (
                  <p className="text-purple-200 text-sm">
                    Для общения необходимо зарегистрироваться
                  </p>
                )}
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
                    <span
                      key={index}
                      className={`border p-1 rounded-sm ${theme.options.bgColor3} ${theme.options.textColor} text-xs`}
                    >
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
        </FloatingPortal>
      )}
    </div>
  );
};

const BotGridSection = ({ title, icon, bots, isReg }) => {
  return (
    <div className="flex-1 h-full">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span className="text-purple-300 text-sm">({bots.length})</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 h-full pr-2 relative overflow-visible">
        {bots.map((bot) => (
          <BotCard isReg={isReg} key={bot.id} {...bot} />
        ))}
      </div>
    </div>
  );
};

export function DashBoard() {
  const { theme, isReg } = useRegister();
  const [searchBot, setSearchBot] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // для фильтрации
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("popular");

  const botCategories = {
    popular: {
      title: "Популярные",
      icon: <TrendingUp className="text-green-400" size={24} />,
      bots: BotsData.filter((bot) => bot.isPopular),
    },
    new: {
      title: "Новинки",
      icon: <Clock className="text-blue-400" size={24} />,
      bots: BotsData.filter((bot) => bot.isNew),
    },
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => [...prev, category]);
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const handleResetAllCategories = () => {
    setSelectedCategories([]);
  };

  // Фильтрация по выбранной категории, тегам и поиску
  const getFilteredBots = () => {
    let bots = botCategories[activeCategory].bots;
    if (selectedCategories.length > 0) {
      bots = bots.filter((bot) =>
        selectedCategories.every((tag) => bot.tags.includes(tag))
      );
    }
    if (searchQuery) {
      bots = bots.filter((bot) =>
        bot.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return bots;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchQuery(searchBot);
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(searchBot);
  };

  return (
    <div
      className={`flex pt-12 px-3 flex-col h-screen ${theme.options.bgColor}`}
    >
      {/* Заголовок и поиск */}
      <div className="flex justify-between items-center py-7 px-7 w-full">
        <div>
          {isReg ? (
            <p className="text-3xl font-bold max-w-[500px]">
              Добро пожаловать, {user.name}!
            </p>
          ) : (
            <p className="text-3xl font-bold max-w-[300px]">
              Добро пожаловать!
            </p>
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
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-row flex-1 pr-5 overflow-hidden">
        <CategoryFilter
          categories={Categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onCategoryRemove={handleCategoryRemove}
          onResetAll={handleResetAllCategories}
        />

        <div className="flex-1 ml-5 mb-10 pr-5 flex flex-col h-full">
          {/* Если был подтверждён поиск (searchQuery не пустой) или выбраны теги — показываем только найденные карточки */}
          {(searchQuery || selectedCategories.length > 0) ? (
            getFilteredBots().length === 0 ? (
              <div className="flex w-full justify-center items-center gap-2 mt-20 text-xl text-purple-300">
                <p>Ничего не найдено</p>
                <Frown />
              </div>
            ) : (
              <BotGridSection
                title={searchQuery ? `Результаты (${getFilteredBots().length})` : botCategories[activeCategory].title}
                icon={searchQuery ? <SearchIcon className="text-blue-400" size={24} /> : botCategories[activeCategory].icon}
                bots={getFilteredBots()}
                isReg={isReg}
              />
            )
          ) : (
            <div className="flex flex-col h-full">
              {/* Переключатель категорий */}
              <div className="flex gap-2 mb-6">
                {Object.entries(botCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                      activeCategory === key
                        ? `${theme.options.mgColor} ${theme.options.textColor} ${theme.options.bgBorderColor}`
                        : `${theme.options.bgColor3} ${theme.options.textColor} ${theme.options.bgBorderColor}`
                    }`}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>

              {/* Активная категория */}
              <BotGridSection
                title={botCategories[activeCategory].title}
                icon={botCategories[activeCategory].icon}
                bots={botCategories[activeCategory].bots}
                isReg={isReg}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}