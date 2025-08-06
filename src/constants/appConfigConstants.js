// Configuraciones y constantes para la aplicación de horarios

// Configuración de DayPilot Calendar
export const CALENDAR_CONFIG = {
  viewType: "Month",
  locale: "es-es",
  theme: "month_default",
  timeFormat: "Clock24Hours",
  weekStarts: 1, // Lunes
  cellHeight: 50,
  // width: null,
  // heightSpec: "Parent100Pct",
};

// Límites de tiempo para cálculos
export const TIME_LIMITS = {
  // Nocturnidad
  NIGHT_START: "22:00",
  NIGHT_END: "06:00",

  // Plus madrugada
  EARLY_MORNING_START: "04:00",
  EARLY_MORNING_END: "06:55",

  // Plus mantenimiento - ventanas
  MAINTENANCE_WINDOW_1_START: "14:00",
  MAINTENANCE_WINDOW_1_END: "16:00",
  MAINTENANCE_WINDOW_2_START: "21:00",
  MAINTENANCE_WINDOW_2_END: "23:00",
};

// Duraciones mínimas (en minutos)
export const MIN_DURATIONS = {
  SINGLE_SHIFT: 120, // 2 horas mínimo por turno
  TOTAL_SPLIT_SHIFT: 300, // 5 horas mínimo si hay 2 turnos
  MAINTENANCE_SHIFT: 360, // 6 horas mínimo para plus mantenimiento
};

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  MIN_SHIFT_DURATION: "El turno debe ser de mínimo 2 horas",
  MIN_TOTAL_DURATION: "El total de ambos turnos debe ser mínimo 5 horas",
  INVALID_TIME_ORDER: "La hora de salida debe ser posterior a la de entrada",
  REQUIRED_FIELDS: "Todos los campos son obligatorios",
};

// Configuración de la interfaz
export const UI_CONFIG = {
  MODAL_MAX_WIDTH: "max-w-lg",
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 200,
};

// Configuración del localStorage
export const STORAGE_CONFIG = {
  KEY: "workScheduleData",
  VERSION: "1.0",
};

// Tipos de eventos
export const EVENT_TYPES = {
  SHIFT: "shift",
  SUMMARY: "resumen",
};

// Opciones de navegación
export const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Home",
    icon: "🏠",
    path: "/dashboard",
  },
  {
    id: "calendar",
    label: "Calendario",
    icon: "📅",
    path: "/calendar",
  },
];
