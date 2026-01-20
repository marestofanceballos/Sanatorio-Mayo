const DejanosTuCV = () => {
  return (
    <div className="container my-5">
      <h1 className="text-success mb-4">Trabajá con nosotros</h1>

      <div className="card p-4 shadow-sm">
        <h3 className="mb-4">Dejanos tu CV</h3>

        <form>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" required />
          </div>

          {/* Fecha nacimiento */}
          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input type="date" className="form-control" required />
          </div>

          {/* DNI */}
          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input type="text" className="form-control" required />
          </div>

          {/* Domicilio */}
          <div className="mb-3">
            <label className="form-label">Domicilio</label>
            <input type="text" className="form-control" required />
          </div>

          {/* Celular */}
          <div className="mb-3">
            <label className="form-label">Número de celular</label>
            <input type="tel" className="form-control" required />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>

          {/* Experiencia */}
          <div className="mb-3">
            <label className="form-label">
              ¿Tuvo experiencia en el puesto?
            </label>
            <select className="form-select">
              <option>No</option>
              <option>Sí</option>
            </select>
          </div>

          {/* Años */}
          <div className="mb-3">
            <label className="form-label">Años de experiencia</label>
            <input type="number" className="form-control" />
          </div>

          {/* CV */}
          <div className="mb-4">
            <label className="form-label">Adjuntar CV</label>
            <input type="file" className="form-control" />
          </div>

          <button type="submit" className="btn btn-success">
            Enviar CV
          </button>
        </form>
      </div>
    </div>
  );
};

export default DejanosTuCV;