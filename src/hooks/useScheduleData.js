import { useState, useEffect } from "react";
import {
  getCalendarEvents,
  getDayEvents,
  saveDayData,
} from "../utils/localStorage";
import {
  getDuration,
  getNocturnidad,
  isPlusMadrugue,
  isPlusManutencion,
  validateTurno,
  validateTotalTurnos,
} from "../utils/scheduleCalculations";

export const useScheduleData = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar eventos al inicializar
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    setLoading(true);
    try {
      const calendarEvents = getCalendarEvents();
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene los datos de un día específico para el modal
   * @param {string} dateStr - Fecha en formato YYYY-MM-DD
   * @returns {Object} Datos formateados para el modal
   */
  const loadDayData = (dateStr) => {
    const dayEvents = getDayEvents(dateStr);

    const modalData = {
      turno1: { entrada: "", salida: "" },
      turno2: { entrada: "", salida: "" },
    };

    dayEvents.forEach((event, index) => {
      const [entrada, salida] = event.title.split(" - ");
      if (index === 0) {
        modalData.turno1 = { entrada, salida };
      } else if (index === 1) {
        modalData.turno2 = { entrada, salida };
      }
    });

    return modalData;
  };

  /**
   * Guarda los datos de un día
   * @param {string} dateStr - Fecha en formato YYYY-MM-DD
   * @param {Object} modalData - Datos del modal
   * @returns {Object} Resultado de la operación
   */
  const saveDaySchedule = (dateStr, modalData) => {
    try {
      // Validar datos
      const validationResult = validateScheduleData(modalData);
      if (!validationResult.isValid) {
        return { success: false, errors: validationResult.errors };
      }

      // Generar datos para guardar
      const { events: newEvents, summary } = generateScheduleData(
        dateStr,
        modalData
      );

      // Guardar en localStorage
      saveDayData(dateStr, newEvents, summary);

      // Recargar eventos
      loadEvents();

      return { success: true };
    } catch (error) {
      console.error("Error saving schedule:", error);
      return { success: false, errors: ["Error al guardar los datos"] };
    }
  };

  /**
   * Valida los datos del modal
   * @param {Object} modalData - Datos del modal
   * @returns {Object} Resultado de la validación
   */
  const validateScheduleData = (modalData) => {
    const errors = [];

    // Validar turno 1
    if (modalData.turno1.entrada || modalData.turno1.salida) {
      const error1 = validateTurno(
        modalData.turno1.entrada,
        modalData.turno1.salida
      );
      if (error1) errors.push(error1);
    }

    // Validar turno 2
    if (modalData.turno2.entrada || modalData.turno2.salida) {
      const error2 = validateTurno(
        modalData.turno2.entrada,
        modalData.turno2.salida
      );
      if (error2) errors.push(error2);
    }

    // Validar total si hay dos turnos
    const totalError = validateTotalTurnos(modalData.turno1, modalData.turno2);
    if (totalError) errors.push(totalError);

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  /**
   * Genera los datos de eventos y resumen
   * @param {string} dateStr - Fecha
   * @param {Object} modalData - Datos del modal
   * @returns {Object} Eventos y resumen generados
   */
  const generateScheduleData = (dateStr, modalData) => {
    const groupId = crypto.randomUUID();
    const newEvents = [];
    let totalDuration = 0;
    let totalNocturnidad = 0;
    let hasMadrugue = false;
    let hasManutencion = false;
    let hasPartidos = false;

    // Procesar turno 1
    if (modalData.turno1.entrada && modalData.turno1.salida) {
      const duration1 = getDuration(
        modalData.turno1.entrada,
        modalData.turno1.salida
      );
      totalDuration += duration1;
      totalNocturnidad += getNocturnidad(
        modalData.turno1.entrada,
        modalData.turno1.salida
      );

      if (isPlusMadrugue(modalData.turno1.entrada)) hasMadrugue = true;
      if (isPlusManutencion(modalData.turno1.entrada, modalData.turno1.salida))
        hasManutencion = true;

      newEvents.push({
        id: crypto.randomUUID(),
        groupId: groupId,
        title: `${modalData.turno1.entrada} - ${modalData.turno1.salida}`,
        date: dateStr,
      });
    }

    // Procesar turno 2
    if (modalData.turno2.entrada && modalData.turno2.salida) {
      const duration2 = getDuration(
        modalData.turno2.entrada,
        modalData.turno2.salida
      );
      totalDuration += duration2;
      totalNocturnidad += getNocturnidad(
        modalData.turno2.entrada,
        modalData.turno2.salida
      );
      hasPartidos = true;

      if (isPlusMadrugue(modalData.turno2.entrada)) hasMadrugue = true;
      if (isPlusManutencion(modalData.turno2.entrada, modalData.turno2.salida))
        hasManutencion = true;

      newEvents.push({
        id: crypto.randomUUID(),
        groupId: groupId,
        title: `${modalData.turno2.entrada} - ${modalData.turno2.salida}`,
        date: dateStr,
      });
    }

    // Generar resumen
    const summary = {
      type: "resumen",
      fecha: dateStr,
      id: groupId,
      groupId: groupId,
      partidos: hasPartidos,
      turnoDuracion: totalDuration.toString(),
      nocturnidad: totalNocturnidad.toString(),
      plusMadrugue: hasMadrugue,
      plusTransporte: true, // Asumiendo siempre true por ahora
      plusManutencion: hasManutencion,
    };

    return { events: newEvents, summary };
  };

  return {
    events,
    loading,
    loadDayData,
    saveDaySchedule,
    refreshEvents: loadEvents,
  };
};
