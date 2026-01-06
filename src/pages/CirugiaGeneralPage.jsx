import "../pages/consultorios.css"

function CirugiaGeneralPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Cirugía General
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        {/* ================= CIRUGÍA GENERAL ================= */}
        <div className="consultorio-card">
          <h4>Especialistas</h4>

          <ul>
            <li>
              <strong>Dr. Carrizo Gustavo</strong><br />
              Miércoles – 16 a 20 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dr. Pintor Guillermo</strong><br />
              Martes – 10 a 12 hs<br />
              📞 3865-431305
            </li>

            <li>
              <strong>Dr. Pintor Rodrigo</strong><br />
              Martes – desde 16 hs<br />
              📞 381-2060458
            </li>

            <li>
              <strong>Dr. Yapur Gustavo</strong><br />
              Lunes – 17 a 20 hs<br />
              📞 381-3306111
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default CirugiaGeneralPage
