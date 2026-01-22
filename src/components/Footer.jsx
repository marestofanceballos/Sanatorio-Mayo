import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* IZQUIERDA - INFO */}
        <div className="footer-info">
          <p className="footer-text">
            © {new Date().getFullYear()} Sanatorio Mayo. Todos los derechos reservados.
          </p>

          <p className="footer-text footer-item">
            <i className="bi bi-geo-alt"></i>
            24 de Septiembre 1544, Concepción, Tucumán
          </p>

          <p className="footer-text footer-item">
            <i className="bi bi-envelope"></i>
            sanatoriomayo1544@gmail.com
          </p>
        </div>

        {/* CENTRO - REDES */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/sanatorio_mayo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        <div className="footer-slogan">
          <strong> Atención médica de calidad con calidez humana</strong>
       <p className="footer-sub">
        Equipo profesional de médicos y especialistas
       </p>
      </div>


      </div>
    </footer>
  )
 
  
}

export default Footer




