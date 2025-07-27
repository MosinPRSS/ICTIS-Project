import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../api/auth"; // путь к твоему хуку

export default function Login({ onClose }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login: performLogin } = useLogin(); // используем хук для логина

  const isLogin = mode === "login";
  const name = isLogin ? "Войти в аккаунт" : "Регистрация";

  const toggleMode = () => {
    setMode(prev => (prev === "login" ? "register" : "login"));
    setError(""); // очищаем ошибки при смене режима
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin) {
      // Регистрация - проверка паролей 
      if (password !== confirmPassword) {
        setError("Пароли не совпадают");
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        // Логин с использованием хука
        const result = await performLogin(email, password);
        if (result === 0) {
          // Успешный логин - можно перенаправить на главную или другую страницу
          console.log("Успешный логин!");
          navigate("/"); // или куда тебе нужно
        } else if (result === -1) {
          // Ошибка авторизации (401)
          setError("Неверный логин или пароль");
        }
        // Редирект на ошибку обрабатывается внутри хука useLogin
      } else {
        // Регистрация - нужно реализовать отдельную функцию
        console.log("Регистрация:", { username, email, password });
        // await register(username, email, password);
        // navigate("/"); // после успешной регистрации
      }
    } catch (err) {
      setError("Ошибка авторизации. Проверьте данные.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="
          relative
          w-full max-w-lg
          bg-white
          rounded-sm
          shadow-xl/50
          p-10    
          space-y-3
          border
          border-white
        "
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold transition duration-200"
        >
          &times;
        </button>

        {/* Заголовок */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Войти через... */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center border rounded-sm bg-white hover:shadow-xl/20 transition duration-200 p-2">
            <div className="w-8 h-8 flex-shrink-0">
              <img src="/google.png" className="h-full w-full object-cover rounded-sm" alt="auth" />
            </div>
          </div>
          <div className="flex items-center border rounded-sm bg-white hover:shadow-xl/20 transition duration-200 p-2">
            <div className="w-8 h-8 flex-shrink-0">
              <img src="/google.png" className="h-full w-full object-cover rounded-sm" alt="auth" />
            </div>
          </div>
          <div className="flex items-center border rounded-sm bg-white hover:shadow-xl/20 transition duration-200 p-2">
            <div className="w-8 h-8 flex-shrink-0">
              <img src="/google.png" className="h-full w-full object-cover rounded-sm" alt="auth" />
            </div>
          </div>
          
        </div>
        

        {/* Разделитель */}
        <div className="flex items-center my-1">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">или</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Поля формы */}
        {!isLogin && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Ник пользователя
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Никнейм"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm transition outline-none"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm transition outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm transition outline-none"
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Подтвердите пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm transition outline-none"
              required
            />
          </div>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-500 text-white font-medium py-2.5 px-4 rounded-sm transition duration-300 hover:shadow-lg/20 disabled:opacity-50"
        >
          {loading ? "Загрузка..." : name}
        </button>

        {/* Переключатель режимов */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          {isLogin ? (
            <>
              <p>
                Нет аккаунта?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-medium hover:text-gray-800 underline"
                >
                  Зарегистрироваться
                </button>
              </p>
              <p>
                Забыли пароль?{" "}
                <a href="/" className="hover:text-gray-800 underline">
                  Восстановить
                </a>
              </p>
            </>
          ) : (
            <p>
              Уже есть аккаунт?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium hover:text-gray-800 underline"
              >
                Войти
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}