import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AlertModal from "../components/AlertModal";
import { API_URL } from "../config/api";
import "../pages/doctorLogin.css";

export default function DoctorLogin() {

  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  // "doctor" o "secretaria"
  const [modo, setModo] = useState("doctor");

  const [alerta, setAlerta] = useState({ open: false, tipo: "error", mensaje: "" });

  const cerrarAlerta = () =>
    setAlerta((a) => ({ ...a, open: false }));

  const mostrarError = (mensaje) =>
    setAlerta({ open: true, tipo: "error", mensaje });

  const [form, setForm] = useState({
    email: "",
    usuario: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSecretaria = async () => {
    try {
      const res = await fetch(`${API_URL}/api/secretaria/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: form.usuario,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarError(data.mensaje || "No se pudo iniciar sesión.");
        return;
      }

      localStorage.setItem("secretariaId", data.id);
      localStorage.setItem("secretariaNombre", data.nombre);

      navigate("/secretaria");

    } catch (error) {
      console.log(error);
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (modo === "secretaria") {
      handleLoginSecretaria();
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/doctor-auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarError(data.msg || "No se pudo iniciar sesión.");
        return;
      }

      // guardar datos del doctor
      localStorage.setItem("doctorId", data.id);
      localStorage.setItem("doctorNombre", data.nombre);

      // redirigir al panel del doctor
      navigate(`/doctor/${data.id}`);

    } catch (error) {
      console.log(error);
      mostrarError("Error de conexión con el servidor. Intentá nuevamente.");
    }
  };

  return (
    <div className="doctor-login-wrapper">
      <div className="doctor-login-card">
        <h2 className="doctor-login-title">
          Ingreso Profesional
        </h2>

        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab ${modo === "doctor" ? "activo" : ""}`}
            onClick={() => setModo("doctor")}
          >
            Profesional
          </button>
          <button
            type="button"
            className={`login-tab ${modo === "secretaria" ? "activo" : ""}`}
            onClick={() => setModo("secretaria")}
          >
            Secretaría
          </button>
        </div>

        <form
          onSubmit={handleLogin}
          className="doctor-login-form"
        >

          {modo === "doctor" ? (
            <input
              key="email"
              type="email"
              name="email"
              placeholder="Correo profesional"
              value={form.email}
              onChange={handleChange}
              required
              className="doctor-login-input"
            />
          ) : (
            <input
              key="usuario"
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={form.usuario}
              onChange={handleChange}
              required
              autoComplete="username"
              className="doctor-login-input"
            />
          )}

          <div className="password-field">
            <input
              type={mostrarPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
              className="doctor-login-input"
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

          <button
            type="submit"
            className="doctor-login-button"
          >
            Ingresar
          </button>

          {modo === "doctor" && (
            <p style={{ marginTop: "15px" }}>
              ¿Sos profesional nuevo?{" "}
              <Link to="/doctor-register" className="doctor-register-link">
                Registrate acá
              </Link>
            </p>
          )}

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
}