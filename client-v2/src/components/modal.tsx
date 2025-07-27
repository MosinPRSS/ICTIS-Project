import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`
          absolute inset-0 bg-opacity-50 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      <div
        className={`
          relative z-10 transform transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
