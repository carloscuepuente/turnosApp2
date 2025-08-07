import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { formatDate } from "../../utils/dateHelpers";

function ScheduleModal({ isOpen, onClose, selectedDate, initialData, onSave }) {
  const [modalData, setModalData] = useState({
    turno1: { entrada: "", salida: "" },
    turno2: { entrada: "", salida: "" },
  });
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  // Cargar datos iniciales cuando se abre el modal
  useEffect(() => {
    if (isOpen && initialData) {
      setModalData(initialData);
      setErrors([]);
    }
  }, [isOpen, initialData]);

  // Limpiar datos cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setModalData({
        turno1: { entrada: "", salida: "" },
        turno2: { entrada: "", salida: "" },
      });
      setErrors([]);
      setSaving(false);
    }
  }, [isOpen]);

  const handleInputChange = (turno, field, value) => {
    setModalData((prev) => ({
      ...prev,
      [turno]: {
        ...prev[turno],
        [field]: value,
      },
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrors([]);

    try {
      const result = await onSave(selectedDate, modalData);

      if (result.success) {
        onClose();
      } else {
        setErrors(result.errors || ["Error desconocido"]);
      }
    } catch (error) {
      setErrors(["Error al guardar los datos", error]);
    } finally {
      setSaving(false);
    }
  };

  const clearTurno = (turnoNumber) => {
    const turnoKey = `turno${turnoNumber}`;
    setModalData((prev) => ({
      ...prev,
      [turnoKey]: { entrada: "", salida: "" },
    }));
  };

  const hasTurno1Data = modalData.turno1.entrada || modalData.turno1.salida;
  const hasTurno2Data = modalData.turno2.entrada || modalData.turno2.salida;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        selectedDate ? `Horario del ${formatDate(selectedDate)}` : "Horario"
      }
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Mensajes de error */}
        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500 rounded-md p-4">
            <div className="flex items-center">
              <span className="text-red-400 mr-2">⚠️</span>
              <h4 className="text-red-400 font-medium">Error de validación</h4>
            </div>
            <ul className="mt-2 text-red-300 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Turno 1 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Turno 1</h3>
            {hasTurno1Data && (
              <button
                onClick={() => clearTurno(1)}
                className="text-red-400 hover:text-red-300 text-sm transition duration-200"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Entrada"
              type="time"
              value={modalData.turno1.entrada}
              onChange={(e) =>
                handleInputChange("turno1", "entrada", e.target.value)
              }
            />
            <Input
              label="Salida"
              type="time"
              value={modalData.turno1.salida}
              onChange={(e) =>
                handleInputChange("turno1", "salida", e.target.value)
              }
            />
          </div>
        </div>

        {/* Turno 2 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Turno 2</h3>
            {hasTurno2Data && (
              <button
                onClick={() => clearTurno(2)}
                className="text-red-400 hover:text-red-300 text-sm transition duration-200"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Entrada"
              type="time"
              value={modalData.turno2.entrada}
              onChange={(e) =>
                handleInputChange("turno2", "entrada", e.target.value)
              }
            />
            <Input
              label="Salida"
              type="time"
              value={modalData.turno2.salida}
              onChange={(e) =>
                handleInputChange("turno2", "salida", e.target.value)
              }
            />
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-600/50 rounded-md p-4">
          <p className="text-sm text-gray-300">
            💡 <strong>Instrucciones:</strong>
          </p>
          <ul className="text-sm text-gray-300 mt-2 space-y-1">
            <li>• Llena el turno 2 solo si tienes un turno partido</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? "Guardando..." : "GUARDAR CAMBIOS"}
          </Button>
          <Button onClick={onClose} variant="secondary" disabled={saving}>
            CERRAR
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ScheduleModal;
