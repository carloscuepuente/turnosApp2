/**
 * Formatea una fecha para mostrar en español
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada (ej: "24 jul 2025")
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00"); // Evita problemas de zona horaria
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 * @returns {string} Fecha actual
 */
export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

/**
 * Obtiene el primer día del mes actual
 * @returns {string} Fecha del primer día del mes
 */
export const getFirstDayOfMonth = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  return firstDay.toISOString().split("T")[0];
};

/**
 * Obtiene el último día del mes actual
 * @returns {string} Fecha del último día del mes
 */
export const getLastDayOfMonth = () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay.toISOString().split("T")[0];
};

/**
 * Verifica si una fecha es hoy
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {boolean} True si es hoy
 */
export const isToday = (dateStr) => {
  return dateStr === getCurrentDate();
};

/**
 * Obtiene el nombre del mes en español
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} Nombre del mes
 */
export const getMonthName = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-ES", { month: "long" });
};

/**
 * Obtiene el año de una fecha
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {number} Año
 */
export const getYear = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.getFullYear();
};
