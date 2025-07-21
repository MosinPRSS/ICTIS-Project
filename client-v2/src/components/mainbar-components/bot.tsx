// there is bot's fields w/ info
// Заготовка - готова
// далее - заполнение (после апи)


export default function Bot() {
  return (
    <div className="
      flex 
      flex-shrink-0
      m-2 mt-4
      w-45 h-70
      bg-gray-400 rounded-xl
      transition
      duration-300
      ease-in-out
      hover:shadow-xl/30
      hover:scale-110
      overflow-hidden
      relative
      group
      ">
      <img src="/homyak.jpg"
        className="
        transition
        duration-300
        ease-in-out
        hover:blur-sm
        hover:brightness-75
        group-hover:blur-sm
        group-hover:brightness-75
        "/>
      {/*прикольный градиент */}
      <div className="
        absolute inset-0
        bg-gradient-to-b
        from-[rgb(9,111,159)]/50 
        to-gray-500/50
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-300 
        ease-in-out
      "></div>
    </div>
  );
}
