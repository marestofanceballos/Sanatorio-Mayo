import { useState } from "react";
import "../pages/doctorRegister.css";

const DoctorRegister = () => {

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/doctor-auth/crear", {
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
        alert(data.msg);
        return;
      }

      alert("Doctor creado correctamente");

      setNombre("");
      setEspecialidad("");
      setEmail("");
      setPassword("");
      setCodigo("");

    } catch (error) {
      console.log(error);
      alert("Error al registrar");
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

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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

    </div>
  );
};

export default DoctorRegister;