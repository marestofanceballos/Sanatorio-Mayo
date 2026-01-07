import "../pages/consultorios.css"

function DermatologiaPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Dermatología
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        <div className="consultorio-card">
          <h4>Especialista</h4>

          <ul>
            <li>
              <strong>Dra. Cannata Valeria</strong><br />
              Martes – desde 14 hs<br />
              📞 381-4658577
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default DermatologiaPage
