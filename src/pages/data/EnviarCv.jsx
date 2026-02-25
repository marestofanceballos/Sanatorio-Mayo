import { useState } from "react";

export default function SubirCv() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [archivo, setArchivo] = useState(null);

  const enviarCv = async (e) => {
    e.preventDefault();

    console.log("ENVIANDO CV...");

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("archivo", archivo);

    try {
      const res = await fetch("http://localhost:4000/api/cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      alert(data.mensaje);

    } catch (error) {
      console.log(error);
      alert("Error al subir el CV");
    }
  };

  return (
    <form onSubmit={enviarCv}>
      <input type="text" required onChange={(e) => setNombre(e.target.value)} />
      <input type="email" required onChange={(e) => setEmail(e.target.value)} />
      <input type="file" required onChange={(e) => setArchivo(e.target.files[0])} />

      <button type="submit">Enviar CV</button>
    </form>
  );
}