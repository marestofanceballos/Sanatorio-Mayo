import "../pages/consultorios.css"

function ConsultoriosPage() {
  return (
    <section className="consultorios-section">
      <div className="container">

        <h2 className="consultorios-title text-center">
          Consultorios Externos
        </h2>

        <p className="consultorios-subtitle text-center">
          Sanatorio Mayo S.A.
        </p>

        {/* ================= CARDIOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Cardiología</h4>

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

        {/* ================= TRAUMATOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Traumatología</h4>

          <ul>
            <li>
              <strong>Dr. Juri Rafael</strong><br />
              Jueves – desde 19 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dr. Montenegro</strong><br />
              Miercoles - desde 17hs<br />
              Sabados - desde 11 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dr. Pérez de Nucci</strong><br />
              Martes y Viernes - 09 a 12 hs<br />
              
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dr. Sarme Alejandro</strong><br />
              Lunes y Jueves – desde 15.30 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

        {/* ================= PSICOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Psicología</h4>

          <ul>
            <li>
              <strong>Lic. Palacios Florencia</strong><br />
              Jueves – 16 a 20 hs<br />
              📞 3865-520997
            </li>
          </ul>
        </div>

        {/* ================= CIRUGÍA GENERAL ================= */}
        <div className="consultorio-card">
          <h4>Cirugía General</h4>

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

        {/* ================= GINECOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Ginecología</h4>

          <ul>
            <li>
              <strong>Dra. Alvarez Yanina</strong><br />
              Lun, Miér y Jue – desde 14 hs<br />
              📞 3865-302379
            </li>

            <li>
              <strong>Dra. Frontini Adriana</strong><br />
              Lun, Mar, Jue y Vie – desde 16:30 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>

            <li>
              <strong>Dra. Linares Virginia</strong><br />
              A PARTIR DE MARZO<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

        {/* ================= DERMATOLOGÍA ================= */}
        <div className="consultorio-card">
          <h4>Dermatología</h4>

          <ul>
            <li>
              <strong>Dra. Cannata Valeria</strong><br />
              Martes – desde 14 hs<br />
              📞 381-4658577
            </li>
          </ul>
        </div>

        {/* ================= CLÍNICA GENERAL ================= */}
        <div className="consultorio-card">
          <h4>Clínica General</h4>

          <ul>
            <li>
              <strong>Dra. Contreras Soledad</strong><br />
              Lunes, Miércoles y Viernes – desde 18:30 hs<br />
              📞 3865-394040
            </li>

            <li>
              <strong>Dra. Rearte Ligia</strong><br />
              Lun, Mar y Vie – 09 a 13 hs y 18 a 21 hs<br />
              Miércoles – 10 a 13 hs y 18 a 21 hs<br />
              <span className="orden">Orden de llegada</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default ConsultoriosPage

