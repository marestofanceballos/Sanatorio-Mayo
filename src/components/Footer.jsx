import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <p className="footer-text">
          © {new Date().getFullYear()} Sanatorio Mayo. Todos los derechos reservados.
        </p>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="bi bi-facebook"></i>
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        <p className="footer-text">
          Atención médica de calidad con calidez humana
        </p>

      </div>
    </footer>
  )
}

export default Footer


