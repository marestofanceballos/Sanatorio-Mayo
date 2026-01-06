import "../pages/consultorios.css"

function PsicologiaPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Psicología
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        {/* ================= PSICOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Especialistas</h4>

          <ul>
            <li>
              <strong>Lic. Palacios Florencia</strong><br />
              Jueves – 16 a 20 hs<br />
              📞 3865-520997
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default PsicologiaPage
