function Header({ onMenuToggle, title = "TurnosApp" }) {
  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-white">{title}</h1>

      <button
        onClick={onMenuToggle}
        className="p-2 rounded-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Abrir menú"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <span className="block w-full h-0.5 bg-white transition-all duration-200"></span>
          <span className="block w-full h-0.5 bg-white transition-all duration-200"></span>
          <span className="block w-full h-0.5 bg-white transition-all duration-200"></span>
        </div>
      </button>
    </header>
  );
}

export default Header;
