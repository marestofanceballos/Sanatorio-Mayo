import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    // 🔹 Si hay hash y NO es recarga
    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace("#", "")
      )

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    } else {
      // 🔹 Siempre arriba
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

export default ScrollToHash



