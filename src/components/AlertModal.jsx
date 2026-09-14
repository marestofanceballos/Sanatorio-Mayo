import { useEffect } from "react";
import "../styles/alertModal.css";

/**
 * Modal genérico para mostrar mensajes de error/éxito en vez de alert().
 * Se cierra con el botón "Aceptar", con clic afuera o con la tecla Escape.
 */
export default function AlertModal({
  open,
  tipo = "error",
  titulo,
  mensaje,
  onClose
}) {

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const esExito = tipo === "success";

  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div
        className={`alert-modal ${esExito ? "alert-modal-success" : "alert-modal-error"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="alert-modal-title">
          {titulo || (esExito ? "Listo" : "Ocurrió un error")}
        </h3>

        <p className="alert-modal-message">{mensaje}</p>

        <button className="alert-modal-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
