import { useEffect, useRef, useState } from "react";
import { useRegister } from "../context/UserIsRegisteredContext";
import { SendIcon } from "lucide-react";
import { Message, Bot, ChatProps } from "../types/interfaces";

function getCurrentTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export default function Chat({ bot }: ChatProps) {
  const { theme } = useRegister();
    const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Здравствуй! Я твой виртуальный собеседник. О чём поговорим?', 
      isUser: false, 
      timestamp: getCurrentTime() 
    }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        isUser: true,
        timestamp: getCurrentTime()
        };

        setMessages([...messages, newUserMessage]);
        setInputMessage('');

        setTimeout(() => {
        const botResponses = [
            `Я понял ваш запрос: '${inputMessage}'. О чём ещё поговорим?`,
            "Спасибо за ваше сообщение!",
        ];
        const botMessage: Message = {
            id: Date.now() + 1,
            text: botResponses[Math.floor(Math.random() * botResponses.length)],
            isUser: false,
            timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        sendMessage();
        }
    };
    
    return (
            <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                {messages.map((message) => (
          <div key={message.id} className="flex flex-row space-x-2">
            {!message.isUser && (
              <img 
                src={bot?.image} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full outline mt-auto mb-3"
                alt="Bot avatar"
              />
            )}
                        <div
              className={`mb-3 flex max-w-[60%] sm:max-w-[40%] break-all whitespace-normal w-fit animate-fadeIn items-start gap-2 rounded-xl p-2 sm:p-3 ${
                            message.isUser
                            ? `ml-auto flex-row-reverse ${theme.options.bgColor2} text-black`
                            : 'bg-gray-200 text-gray-800'
                        }`}
                        >
              <span className="text-sm sm:text-base">{message.text}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
                </div>

                {/* Поле ввода (фиксированная высота) */}
      <div className={`p-2 sm:p-3 ${theme.options.bgColor3} border-1 rounded-sm flex-shrink-0`}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Напишите сообщение..."
            className="flex-1 rounded-full border-none px-3 sm:px-4 py-2 sm:py-3 focus:outline-none text-sm sm:text-base"
                        />
                        <button
                            onClick={sendMessage}
            className={`${theme.options.bgColor} ml-2 flex h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3 outline cursor-pointer items-center justify-center rounded-full ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} hover:scale-110 transition-transform`}
                        >
            <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>        
  );
}