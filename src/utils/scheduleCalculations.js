/**
 * Calcula la duración entre dos tiempos en minutos
 * @param {string} tiempo1 - Hora de inicio (formato HH:mm)
 * @param {string} tiempo2 - Hora de fin (formato HH:mm)
 * @returns {number} Duración en minutos
 */
export const getDuration = (tiempo1, tiempo2) => {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  let time1 = parseTime(tiempo1);
  let time2 = parseTime(tiempo2);

  // Si time2 es antes que time1, significa que cruza medianoche
  if (time2 < time1) {
    time2.setDate(time2.getDate() + 1);
  }

  return Math.abs(time2 - time1) / (1000 * 60); // diferencia en minutos
};

/**
 * Verifica si un tiempo está dentro de un intervalo
 * @param {string} primerIntervalTime - Límite inferior del intervalo
 * @param {string} segundoIntervalTime - Límite superior del intervalo
 * @param {string} tiempo - Tiempo a verificar
 * @returns {boolean} True si está dentro del intervalo
 */
export const isTimeBetween = (
  primerIntervalTime,
  segundoIntervalTime,
  tiempo
) => {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  let primerTime = parseTime(primerIntervalTime);
  let segundoTime = parseTime(segundoIntervalTime);
  let checkTime = parseTime(tiempo);

  // Si el segundo tiempo es antes que el primero, cruza medianoche
  if (segundoTime < primerTime) {
    segundoTime.setDate(segundoTime.getDate() + 1);
  }

  // Si el tiempo a verificar es antes que el primero, podría estar en el día siguiente
  if (checkTime < primerTime) {
    checkTime.setDate(checkTime.getDate() + 1);
  }

  return checkTime >= primerTime && checkTime <= segundoTime;
};

/**
 * Calcula las horas de nocturnidad
 * @param {string} entrada - Hora de entrada
 * @param {string} salida - Hora de salida
 * @param {string} limiteInferior - Límite inferior de nocturnidad (default: "22:00")
 * @param {string} limiteSuperior - Límite superior de nocturnidad (default: "06:00")
 * @returns {number} Minutos de nocturnidad
 */
export const getNocturnidad = (
  entrada,
  salida,
  limiteInferior = "22:00",
  limiteSuperior = "06:00"
) => {
  // Si entrada y salida están dentro del intervalo
  if (
    isTimeBetween(limiteInferior, limiteSuperior, entrada) &&
    isTimeBetween(limiteInferior, limiteSuperior, salida)
  ) {
    return getDuration(entrada, salida);
  }

  // Si entrada está fuera y salida dentro del intervalo
  if (
    !isTimeBetween(limiteInferior, limiteSuperior, entrada) &&
    isTimeBetween(limiteInferior, limiteSuperior, salida)
  ) {
    return getDuration(limiteInferior, salida);
  }

  // Si entrada está dentro y salida fuera del intervalo
  if (
    isTimeBetween(limiteInferior, limiteSuperior, entrada) &&
    !isTimeBetween(limiteInferior, limiteSuperior, salida)
  ) {
    return getDuration(entrada, limiteSuperior);
  }

  // Si ni entrada ni salida están en el intervalo, no hay nocturnidad
  return 0;
};

/**
 * Verifica si aplica el plus de madrugada
 * @param {string} entrada - Hora de entrada
 * @param {string} limiteInferior - Límite inferior del plus (default: "04:00")
 * @param {string} limiteSuperior - Límite superior del plus (default: "06:55")
 * @returns {boolean} True si aplica el plus de madrugada
 */
export const isPlusMadrugue = (
  entrada,
  limiteInferior = "04:00",
  limiteSuperior = "06:55"
) => {
  return isTimeBetween(limiteInferior, limiteSuperior, entrada);
};

/**
 * Verifica si aplica el plus de mantenimiento
 * @param {string} entrada - Hora de entrada del turno
 * @param {string} salida - Hora de salida del turno
 * @returns {boolean} True si aplica el plus de mantenimiento
 */
export const isPlusManutencion = (entrada, salida) => {
  const duracion = getDuration(entrada, salida);

  // Ventana de 14:00 a 16:00 con turno mínimo de 6 horas (360 min)
  if (
    isTimeBetween(entrada, salida, "14:00") &&
    isTimeBetween(entrada, salida, "16:00") &&
    duracion >= 360
  ) {
    return true;
  }

  // Ventana de 21:00 a 23:00 con turno mínimo de 6 horas (360 min)
  if (
    isTimeBetween(entrada, salida, "21:00") &&
    isTimeBetween(entrada, salida, "23:00") &&
    duracion >= 360
  ) {
    return true;
  }

  return false;
};

/**
 * Valida un turno individual
 * @param {string} entrada - Hora de entrada
 * @param {string} salida - Hora de salida
 * @returns {string} Mensaje de error o string vacío si es válido
 */
export const validateTurno = (entrada, salida) => {
  if (!entrada || !salida) return "";

  const duration = getDuration(entrada, salida);
  if (duration < 120) {
    return "El turno debe ser de mínimo 2 horas";
  }

  return "";
};

/**
 * Valida el total de dos turnos
 * @param {Object} turno1 - Objeto con entrada y salida del turno 1
 * @param {Object} turno2 - Objeto con entrada y salida del turno 2
 * @returns {string} Mensaje de error o string vacío si es válido
 */
export const validateTotalTurnos = (turno1, turno2) => {
  if (turno1.entrada && turno1.salida && turno2.entrada && turno2.salida) {
    const duration1 = getDuration(turno1.entrada, turno1.salida);
    const duration2 = getDuration(turno2.entrada, turno2.salida);
    const totalDuration = duration1 + duration2;

    if (totalDuration < 300) {
      // 5 horas = 300 minutos
      return "El total de ambos turnos debe ser mínimo 5 horas";
    }
  }

  return "";
};
