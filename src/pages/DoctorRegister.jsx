import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AlertModal from "../components/AlertModal";
import { API_URL } from "../config/api";
import "../pages/doctorRegister.css";

const DoctorRegister = () => {

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [alerta, setAlerta] = useState({ open: false, tipo: "error", mensaje: "" });

  const cerrarAlerta = () =>
    setAlerta((a) => ({ ...a, open: false }));

  const mostrarError = (mensaje) =>
    setAlerta({ open: true, tipo: "error", mensaje });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/doctor-auth/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          especialidad,
          email,
          password,
          codigo
        })
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarError(data.msg || "No se pudo completar el registro.");
        return;
      }

      setAlerta({
        open: true,
        tipo: "success",
        mensaje: "Doctor creado correctamente."
      });

      setNombre("");
      setEspecialidad("");
      setEmail("");
      setPassword("");
      setCodigo("");

    } catch (error) {
      console.log(error);
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2 className="register-title">Registro Profesional</h2>

        <form onSubmit={handleSubmit} className="register-form">

          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarPassword((v) => !v)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="text"
            placeholder="Código profesional"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />

          <button type="submit">Registrarse</button>

        </form>

      </div>

      <AlertModal
        open={alerta.open}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        onClose={cerrarAlerta}
      />

    </div>
  );
};

export default DoctorRegister;