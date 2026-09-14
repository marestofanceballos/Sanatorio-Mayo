import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AlertModal from "../components/AlertModal";
import "../pages/doctorLogin.css";

export default function DoctorLogin() {

  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [alerta, setAlerta] = useState({ open: false, tipo: "error", mensaje: "" });

  const cerrarAlerta = () =>
    setAlerta((a) => ({ ...a, open: false }));

  const mostrarError = (mensaje) =>
    setAlerta({ open: true, tipo: "error", mensaje });

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/doctor-auth/login", {
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

        <form
          onSubmit={handleLogin}
          className="doctor-login-form"
        >

          <input
            type="email"
            name="email"
            placeholder="Correo profesional"
            onChange={handleChange}
            required
            className="doctor-login-input"
          />

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

          <p style={{ marginTop: "15px" }}>
            ¿Sos profesional nuevo?{" "}
            <Link to="/doctor-register" className="doctor-register-link">
              Registrate acá
            </Link>
          </p>

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