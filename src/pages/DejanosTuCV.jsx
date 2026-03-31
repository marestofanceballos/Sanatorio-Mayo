import { useState } from "react";

const DejanosTuCV = () => {
  const [form, setForm] = useState({
    nombre: "",
    fechaNacimiento: "",
    dni: "",
    domicilio: "",
    celular: "",
    email: "",
    tieneExperiencia: "No",
    aniosExperiencia: "",
  });
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState(null); // "cargando" | "ok" | "error"
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArchivo = (e) => {
    setArchivo(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("cargando");
    setMensajeError("");

    if (!archivo) {
      setMensajeError("Por favor adjuntá tu CV.");
      setEstado("error");
      return;
    }

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("fechaNacimiento", form.fechaNacimiento);
    data.append("dni", form.dni);
    data.append("domicilio", form.domicilio);
    data.append("telefono", form.celular);
    data.append("email", form.email);
    data.append("tieneExperiencia", form.tieneExperiencia);
    data.append("aniosExperiencia", form.aniosExperiencia);
    data.append("cv", archivo);

    try {
      const res = await fetch("http://localhost:4000/api/cvs", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        setMensajeError(json.error || "Ocurrió un error al enviar.");
        setEstado("error");
        return;
      }

      setEstado("ok");
      // Limpiar formulario
      setForm({
        nombre: "",
        fechaNacimiento: "",
        dni: "",
        domicilio: "",
        celular: "",
        email: "",
        tieneExperiencia: "No",
        aniosExperiencia: "",
      });
      setArchivo(null);
      e.target.reset();
    } catch (err) {
      setMensajeError("No se pudo conectar con el servidor.");
      setEstado("error");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-success mb-4">Trabajá con nosotros</h1>

      <div className="card p-4 shadow-sm">
        <h3 className="mb-4">Dejanos tu CV</h3>

        {estado === "ok" && (
          <div className="alert alert-success">
            ✅ ¡CV enviado correctamente! Nos pondremos en contacto a la brevedad.
          </div>
        )}
        {estado === "error" && (
          <div className="alert alert-danger">
            ❌ {mensajeError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className="form-control"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          {/* DNI */}
          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input
              type="text"
              name="dni"
              className="form-control"
              value={form.dni}
              onChange={handleChange}
              required
            />
          </div>

          {/* Domicilio */}
          <div className="mb-3">
            <label className="form-label">Domicilio</label>
            <input
              type="text"
              name="domicilio"
              className="form-control"
              value={form.domicilio}
              onChange={handleChange}
              required
            />
          </div>

          {/* Celular */}
          <div className="mb-3">
            <label className="form-label">Número de celular</label>
            <input
              type="tel"
              name="celular"
              className="form-control"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Experiencia */}
          <div className="mb-3">
            <label className="form-label">¿Tuvo experiencia en el puesto?</label>
            <select
              name="tieneExperiencia"
              className="form-select"
              value={form.tieneExperiencia}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Sí</option>
            </select>
          </div>

          {/* Años de experiencia — solo visible si tiene experiencia */}
          {form.tieneExperiencia === "Sí" && (
            <div className="mb-3">
              <label className="form-label">Años de experiencia</label>
              <input
                type="number"
                name="aniosExperiencia"
                className="form-control"
                min="1"
                value={form.aniosExperiencia}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Archivo CV */}
          <div className="mb-4">
            <label className="form-label">Adjuntar CV</label>
            <input
              type="file"
              name="cv"
              className="form-control"
              accept=".pdf,.doc,.docx"
              onChange={handleArchivo}
              required
            />
            <div className="form-text">Formatos aceptados: PDF, DOC, DOCX. Máximo 5 MB.</div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={estado === "cargando"}
          >
            {estado === "cargando" ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Enviando...
              </>
            ) : (
              "Enviar CV"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DejanosTuCV;