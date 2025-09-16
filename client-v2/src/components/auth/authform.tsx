import { useEffect } from "react";
import Login from "./login-components/form";

// Определяем тип для пропсов
interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Новый пропс
}

export default function AuthForm({ isOpen, onClose, onSuccess }: AuthFormProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* модальное окно */}
      <div
        className="relative z-10 rounded-sm p-6 w-full max-w-md mx-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Передаем onSuccess в Login */}
        <Login onClose={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  );
}