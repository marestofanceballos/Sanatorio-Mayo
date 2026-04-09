import { useState, useRef } from "react";
import "./PostulacionPage.css";

export default function PostulacionPage() {
  const [form, setForm] = useState({
    nombre: "",
    fechaNacimiento: "",
    celular: "",
    email: "",
    dni: "",
    puesto: "",
    tieneExperiencia: false,
  });
  const [archivo, setArchivo] = useState(null);
  const [archivoNombre, setArchivoNombre] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [enviado, setEnviado] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setErrorMsg("Solo se aceptan archivos PDF o Word (.doc, .docx).");
      setArchivo(null);
      setArchivoNombre("");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("El archivo no puede superar los 5 MB.");
      setArchivo(null);
      setArchivoNombre("");
      return;
    }
    setErrorMsg("");
    setArchivo(file);
    setArchivoNombre(file.name);
  };

  const handleSubmit = () => {
    const { nombre, fechaNacimiento, celular, email, dni, puesto } = form;
    if (!nombre || !fechaNacimiento || !celular || !email || !dni || !puesto) {
      setErrorMsg("Por favor completá todos los campos obligatorios.");
      return;
    }
    if (!archivo) {
      setErrorMsg("Por favor adjuntá tu CV.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("El correo electrónico no es válido.");
      return;
    }
    setErrorMsg("");
    setEnviado(true);
  };

  const toggleExperiencia = () => {
    setForm((prev) => ({ ...prev, tieneExperiencia: !prev.tieneExperiencia }));
  };

  if (enviado) {
    return (
      <div className="post-page">
        <div className="post-success-card">
          <div className="post-success-icon">✓</div>
          <h2 className="post-success-title">Postulación enviada</h2>
          <p className="post-success-text">
            Recibimos tu CV correctamente. Nos pondremos en contacto si tu
            perfil se ajusta a nuestras búsquedas.
          </p>
          <button className="post-back-btn" onClick={() => setEnviado(false)}>
            Volver al formulario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="post-header-accent" />
        <div className="post-header-content">
          <span className="post-header-tag">Recursos Humanos</span>
          <h1 className="post-header-title">Trabajá con nosotros</h1>
          <p className="post-header-sub">
            Completá el formulario y adjuntá tu CV. Nuestro equipo revisará tu
            postulación a la brevedad.
          </p>
        </div>
      </div>

      <div className="post-form-wrapper">
        <div className="post-card">

          <p className="post-section-label">Datos personales</p>

          <div className="post-row">
            <div className="post-field-full">
              <label className="post-label">
                Nombre y apellido <span className="post-req">*</span>
              </label>
              <input
                className="post-input"
                type="text"
                name="nombre"
                placeholder="Ej: María González"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="post-row">
            <div className="post-field-half">
              <label className="post-label">
                DNI <span className="post-req">*</span>
              </label>
              <input
                className="post-input"
                type="text"
                name="dni"
                placeholder="Ej: 38547123"
                value={form.dni}
                onChange={handleChange}
              />
            </div>
            <div className="post-field-half">
              <label className="post-label">
                Fecha de nacimiento <span className="post-req">*</span>
              </label>
              <input
                className="post-input"
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="post-row">
            <div className="post-field-half">
              <label className="post-label">
                Celular <span className="post-req">*</span>
              </label>
              <input
                className="post-input"
                type="tel"
                name="celular"
                placeholder="Ej: 381 4123456"
                value={form.celular}
                onChange={handleChange}
              />
            </div>
            <div className="post-field-half">
              <label className="post-label">
                Correo electrónico <span className="post-req">*</span>
              </label>
              <input
                className="post-input"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="post-divider" />

          <p className="post-section-label">Postulación</p>

          <div className="post-row">
            <div className="post-field-full">
              <label className="post-label">
                Puesto al que te postulás <span className="post-req">*</span>
              </label>
              <textarea
                className="post-input post-textarea"
                name="puesto"
                placeholder="Describí el puesto o área a la que te postulás..."
                value={form.puesto}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="post-exp-row">
            <div
              className={form.tieneExperiencia ? "post-toggle post-toggle--on" : "post-toggle"}
              onClick={toggleExperiencia}
            >
              <div className="post-toggle-thumb" />
            </div>
            <span className="post-exp-label">
              Tengo experiencia en el puesto al que me postulo
            </span>
          </div>

          <div className="post-divider" />

          <p className="post-section-label">Currículum Vitae</p>

          <div
            className={archivo ? "post-dropzone post-dropzone--active" : "post-dropzone"}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile({ target: { files: e.dataTransfer.files } });
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            {archivo ? (
              <>
                <span className="post-file-icon">📄</span>
                <span className="post-file-name">{archivoNombre}</span>
                <span className="post-file-change">Clic para cambiar</span>
              </>
            ) : (
              <>
                <span className="post-upload-icon">⬆</span>
                <span className="post-upload-title">
                  Arrastrá tu CV o hacé clic para seleccionar
                </span>
                <span className="post-upload-sub">PDF, DOC o DOCX — Máx. 5 MB</span>
              </>
            )}
          </div>

          {errorMsg && <p className="post-error">{errorMsg}</p>}

          <button className="post-submit-btn" onClick={handleSubmit}>
            Enviar postulación
          </button>

        </div>
      </div>
    </div>
  );
}