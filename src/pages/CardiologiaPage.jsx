import "../pages/consultorios.css"

function CardiologiaPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Cardiología
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        {/* ================= CARDIOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Especialistas</h4>

          <ul>
            <li>
              <strong>Dr. Acosta Sergio</strong><br />
              Lunes a Viernes – desde 17 hs<br />
              📞 3865-526704
            </li>

            <li>
              <strong>Dr. Ledesma Emiliano</strong><br />
              Martes, Jueves y Viernes – desde 16 hs<br />
              📞 3865-202148
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default CardiologiaPage
