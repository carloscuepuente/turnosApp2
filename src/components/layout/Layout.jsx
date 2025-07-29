import { useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout({ children, currentView, onViewChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Header onMenuToggle={handleMenuToggle} />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        currentView={currentView}
        onViewChange={onViewChange}
      />

      <main className="p-4">{children}</main>
    </div>
  );
}

export default Layout;
