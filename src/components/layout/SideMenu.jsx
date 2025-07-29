import { NAVIGATION_ITEMS } from "../../constants/appConfigConstants";

function SideMenu({ isOpen, onClose, currentView, onViewChange }) {
  const handleNavClick = (viewId) => {
    onViewChange(viewId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-64 bg-gray-900 p-4 shadow-xl transform transition-transform duration-1000 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del menú */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold text-white">Menú</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-gray-300 transition duration-1000"
            aria-label="Cerrar menú"
          >
            &times;
          </button>
        </div>

        {/* Items de navegación */}
        <nav className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                flex items-center w-full text-left p-3 rounded-md transition duration-200
                ${
                  currentView === item.id
                    ? "bg-teal-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer del menú */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-gray-400 text-sm">Versión 0.5</p>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
