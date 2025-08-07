import { Link } from "react-router";

type Props = {
  onOpenAuth?: (method: string) => void;

  // data
  name: string;
  publicDescription: string;

  // meta
  sessionCount: string;
  userAvatarUrl: string;
  username: string;
  userUrl: string;
  userID: string;

  tags: []

  avatarUrl: string;
};

export default function Bot({
  onOpenAuth,
  name,
  publicDescription,
  sessionCount,
  userAvatarUrl,
  username,
  userID,
  avatarUrl,
}: Props) {
  const handleClick = () => {
    if (onOpenAuth) {
      onOpenAuth("register");
    }
  };

  return (
    <div
      className={`
        flex
        flex-shrink-0
        m-2 mt-2
        w-36 h-48
        sm:w-40 sm:h-56
        md:w-45 md:h-60
        lg:w-45 lg:h-70

        bg-gray-400 rounded-sm
        transition-all
        duration-300
        ease-in-out
        overflow-hidden
        relative
        group
        cursor-pointer

        hover:z-10
        hover:scale-110
        hover:rounded-md
        hover:shadow-2xl
      `}
      onClick={handleClick}
    >
      <img
        src={avatarUrl}
        alt={name}
        className="
          w-full h-full object-cover
          transition
          duration-300
          ease-in-out
          group-hover:blur-xs 
          group-hover:brightness-75
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          bg-gradient-to-t from-black/60 via-black/20 to-transparent
          p-2
          text-white
          flex
          flex-col
          gap-1
        "
      >
        <h3 className="font-bold text-sm truncate drop-shadow-sm">{name}</h3>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <img
              src={userAvatarUrl}
              alt={username}
              className="h-5 w-5 rounded-sm shadow-2xl"
            />
            <Link to={`/profile/${userID}`} 
            className="
            truncate 
            max-w-[80px] 
            drop-shadow-sm
            hover:underline"
            onClick={(e) => e.stopPropagation()}
            >{username}</Link>
          </div>

          <div className="flex items-center gap-1 whitespace-nowrap">
            <img
              src="chats.svg"
              className="h-4 w-4"
            />
            <span>{sessionCount}</span>
          </div>
        </div>
      </div>

      <div
        className="
          absolute
          inset-0
          bg-black/30
          text-white
          p-3
          flex
          items-center
          justify-center
          text-xs
          leading-snug
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-200
          pointer-events-none
          z-10
        "
      >
        <div
          className="
            w-full
            h-full
            overflow-y-auto
            px-1
            text-center
            leading-tight
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            scrollbar-hide
          "
        >
          {publicDescription?.trim() 
            ? publicDescription.length > 150
              ? <i className="opacity-70">{publicDescription.slice(0, 150)}...</i>
              : <i className="opacity-70">{publicDescription}</i>
            : <i className="opacity-70">Описание отсутствует.</i>
          }
        </div>
      </div>
    </div>
  );
}