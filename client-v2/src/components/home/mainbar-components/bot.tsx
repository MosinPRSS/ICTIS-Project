export default function Bot() {
  return (
    <div className={`
      flex 
      flex-shrink-0
      m-2 mt-4

      w-36 h-48    /* 📱 по умолчанию — для маленьких экранов */
      sm:w-40 sm:h-56
      md:w-45 md:h-60
      lg:w-45 lg:h-70  /* 🖥️ на десктопах */

      bg-gray-400 rounded-sm
      transition
      duration-300
      ease-in-out
      hover:shadow-xl/30
      hover:scale-110
      overflow-hidden
      relative
      group
    `}>
      <img src="/homyak.jpg"
        className="
          w-full h-full object-cover
          transition
          duration-300
          ease-in-out
          group-hover:blur-sm
          group-hover:brightness-75
        "
      />

      <div className="
        absolute inset-0
        bg-gradient-to-b
        from-[rgb(9,111,159)]/50 
        to-gray-500/50
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-300 
        ease-in-out
      " />
    </div>
  );
}
