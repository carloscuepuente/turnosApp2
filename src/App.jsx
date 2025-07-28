import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import Layout from "./components/layout/Layout";

function App() {
  const [currentView, setCurrentView] = useState("calendar");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "calendar":
        return <Calendar />;
      default:
        return <Calendar />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;
