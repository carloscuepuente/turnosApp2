// Utilidades para manejar datos en localStorage

const STORAGE_KEY = "workScheduleData";

/**
 * Obtiene todos los datos del localStorage
 * @returns {Array} Array de eventos y resúmenes
 */
export const getScheduleData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
};

/**
 * Guarda datos en localStorage
 * @param {Array} data - Array de eventos y resúmenes
 */
export const saveScheduleData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Obtiene eventos para el calendario (filtra resúmenes)
 * @returns {Array} Array de eventos formateados para DayPilot
 */
export const getCalendarEvents = () => {
  const data = getScheduleData();
  return data
    .filter((item) => item.type !== "resumen")
    .map((item) => ({
      id: item.id,
      text: item.title,
      start: `${item.date}T00:00:00`,
      end: `${item.date}T23:59:59`,
      groupId: item.groupId,
    }));
};

/**
 * Obtiene eventos de un día específico
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {Array} Array de eventos del día
 */
export const getDayEvents = (dateStr) => {
  const data = getScheduleData();
  return data.filter(
    (item) => item.date === dateStr && item.type !== "resumen"
  );
};

/**
 * Obtiene el resumen de un día específico
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {Object|null} Objeto resumen del día o null si no existe
 */
export const getDaySummary = (dateStr) => {
  const data = getScheduleData();
  return (
    data.find((item) => item.date === dateStr && item.type === "resumen") ||
    null
  );
};

/**
 * Elimina todos los datos de una fecha específica
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {Array} Array con datos filtrados (sin la fecha especificada)
 */
export const removeDayData = (dateStr) => {
  const data = getScheduleData();
  return data.filter((item) => item.date !== dateStr);
};

/**
 * Agrega o actualiza datos de un día
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @param {Array} events - Array de eventos del día
 * @param {Object} summary - Objeto resumen del día
 */
export const saveDayData = (dateStr, events, summary) => {
  const filteredData = removeDayData(dateStr);
  const newData = [...filteredData, ...events, summary];
  saveScheduleData(newData);
};
