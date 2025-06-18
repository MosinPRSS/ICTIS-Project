import React, { useState, useEffect } from 'react';

const NumberGuessingGame: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [timer, setTimer] = useState<number>(30);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Инициализация игры
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Таймер обратного отсчета
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameStatus('lost');
          setMessage('Время вышло! Игра окончена.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus]);

  const startNewGame = () => {
    let maxNumber: number;
    switch (difficulty) {
      case 'easy':
        maxNumber = 50;
        setTimer(60);
        break;
      case 'hard':
        maxNumber = 200;
        setTimer(30);
        break;
      case 'medium':
      default:
        maxNumber = 100;
        setTimer(45);
    }

    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    setTargetNumber(randomNumber);
    setUserGuess('');
    setMessage(`Угадайте число от 1 до ${maxNumber}`);
    setAttempts(0);
    setGameStatus('playing');
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameStatus !== 'playing') return;

    const guess = parseInt(userGuess);
    if (isNaN(guess)) {
      setMessage('Пожалуйста, введите число!');
      return;
    }

    setAttempts(prev => prev + 1);

    if (guess === targetNumber) {
      setGameStatus('won');
      setMessage(`Поздравляем! Вы угадали число за ${attempts + 1} попыток и ${60 - timer} секунд!`);
    } else if (guess < targetNumber) {
      setMessage('Слишком маленькое число! Попробуйте еще.');
    } else {
      setMessage('Слишком большое число! Попробуйте еще.');
    }

    setUserGuess('');
  };

  const getHint = () => {
    if (attempts < 3) {
      return 'Подсказка: в случае неудачи вам заблокируют вход на сайт!';
    }

    const hint = targetNumber % 2 === 0 ? 'Число четное' : 'Число нечетное';
    return `Подсказка: ${hint}. Попыток использовано: ${attempts}`;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-400">Угадай число</h1>
        
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setDifficulty('easy')}
            className={`px-4 py-2 rounded ${difficulty === 'easy' ? 'bg-green-600' : 'bg-gray-700'}`}
          >
            Легко
          </button>
          <button
            onClick={() => setDifficulty('medium')}
            className={`px-4 py-2 rounded ${difficulty === 'medium' ? 'bg-yellow-600' : 'bg-gray-700'}`}
          >
            Средне
          </button>
          <button
            onClick={() => setDifficulty('hard')}
            className={`px-4 py-2 rounded ${difficulty === 'hard' ? 'bg-red-600' : 'bg-gray-700'}`}
          >
            Сложно
          </button>
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg mb-2">{message}</p>
          {gameStatus === 'playing' && (
            <>
              <p className="text-sm text-gray-400">Попыток: {attempts}</p>
              <p className="text-sm text-gray-400">Осталось времени: {timer} сек</p>
              <p className="text-xs mt-2 text-yellow-400">{getHint()}</p>
            </>
          )}
        </div>

        {gameStatus === 'playing' ? (
          <form onSubmit={handleGuess} className="flex flex-col space-y-4">
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className="bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Введите число..."
              autoFocus
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Проверить
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className={`text-xl mb-4 ${gameStatus === 'won' ? 'text-green-400' : 'text-red-400'}`}>
              {gameStatus === 'won' ? '🎉 Победа! 🎉' : '😢 Поражение 😢'}
            </p>
            <p className="mb-4">Загаданное число: {targetNumber}</p>
            <button
              onClick={startNewGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              Новая игра
            </button>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          <p>Совет: Начните с середины диапазона и двигайтесь в зависимости от подсказок.</p>
        </div>
      </div>
    </div>
  );
};

export default NumberGuessingGame;