import { useState } from 'react';
import { base_url } from '../../../api/consts';
import { SettingsIcon } from '../../../utils/icons';

type InfoBoxProps = {
  username: string;
  avatarUrl: string;
  createdAt: string;
  userId: string;
  ownProfile?: boolean;
};

export default function InfoBox({ username, avatarUrl, createdAt, userId, ownProfile }: InfoBoxProps) {

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
        {ownProfile ? (
          <div className="flex justify-end">
              <button className="justify-end">
                {<SettingsIcon />}
              </button>
            </div>
          ) : (
            <button className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600 transition mt-2">
              Пожаловаться
            </button>
          )}
        </div>
    </div>
  );
}