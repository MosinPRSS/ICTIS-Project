import { useState } from 'react';
import { base_url } from '../../../api/consts';

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
    <div className="flex w-full h-40 border border-gray-300 rounded-sm overflow-hidden bg-white shadow-md">
      <div className="w-1/3 flex items-center justify-center bg-transparent">
        <div className="h-4/6 aspect-square rounded-sm shadow-sm overflow-hidden ml-4">
          <img
            src={base_url + avatarUrl}
            alt="Аватар"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-2/3 flex flex-col justify-center p-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{username}</h2>
        <i className="text-sm text-gray-600">Создано: {createdAt}</i>
        <button
          onClick={copyIdToClipboard}
          className={`text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer max-w-full truncate
            ${copied ? 'bg-green-100 text-green-700' : ''}`}
          title={userId}
        >
          {copied ? 'Скопировано!' : `ID: ${userId}`}
        </button>
      </div>
    </div>
  );
}