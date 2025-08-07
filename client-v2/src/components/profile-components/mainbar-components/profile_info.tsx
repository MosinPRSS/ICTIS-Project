import { useState } from 'react';

type InfoBoxProps = {
  username: string;
  avatarUrl: string;
  createdAt: string;
  userId: string;
};

export default function InfoBox({ username, avatarUrl, createdAt, userId }: InfoBoxProps) {
  const [copied, setCopied] = useState(false);

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex w-full h-36 border border-gray-300 rounded-sm overflow-hidden bg-white shadow-md">
      <div className="w-1/3 flex items-center justify-center p-3">
        <div className="w-full h-full aspect-square max-w-[80px] max-h-[80px]">
          <img
            src={avatarUrl}
            alt="Аватар"
            className="w-full h-full rounded-md border border-gray-200 shadow-sm"
          />
        </div>
      </div>

      <div className="w-2/3 flex flex-col justify-center p-3 gap-1">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{username}</h2>

        <p className="text-sm text-gray-600">{createdAt}</p>

        <button
          onClick={copyIdToClipboard}
          className={`mt-1 text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer max-w-full truncate
            ${copied ? 'bg-green-100 text-green-700' : ''}`}
          title={userId}
        >
          {copied ? 'Скопировано!' : `ID: ${userId}`}
        </button>
      </div>
    </div>
  );
}