import { useState } from "react";
import { DayPilotMonth } from "@daypilot/daypilot-lite-react";
import ScheduleModal from "./ScheduleModal";
import { useScheduleData } from "../../hooks/useScheduleData";
import { CALENDAR_CONFIG } from "../../constants/appConfigConstants";

function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState(null);

  const { events, loading, loadDayData, saveDaySchedule } = useScheduleData();

  // Configuración del calendario con handlers
  const calendarConfig = {
    ...CALENDAR_CONFIG,
    onTimeRangeSelect: (args) => {
      handleDayClick(args.start.toString("yyyy-MM-dd"));
    },
    onEventClick: (args) => {
      handleDayClick(args.e.start().toString("yyyy-MM-dd"));
    },
  };

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
    const dayData = loadDayData(dateStr);
    setModalData(dayData);
    setIsModalOpen(true);
  };

  const handleSaveSchedule = async (dateStr, scheduleData) => {
    return await saveDaySchedule(dateStr, scheduleData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setModalData(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header del calendario */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-bold text-white mb-2">
          Calendario de Horarios
        </h2>
        <p className="text-gray-300 text-sm">
          Haz clic en cualquier día para agregar o editar tus horarios de
          trabajo
        </p>
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-lg overflow-hidden shadow-lg ">
        <DayPilotMonth {...calendarConfig} events={events} />
      </div>

      {/* Leyenda */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-white mb-2">Leyenda:</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Turno simple</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Turno partido</span>
          </div>
        </div>
      </div>

      {/* Modal de horarios */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        initialData={modalData}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}

export default Calendar;
