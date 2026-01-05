import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToHash from "./components/ScrollToHash"
import WhatsAppButton from "./components/WhatsAppButton"

import Hero from "./components/Hero"
import SobreNosotros from "./components/SobreNosotros"
import Informacion from "./components/Informacion"
import Contacto from "./components/Contacto"
import Atencion24 from "./components/Atencion24"   // ✅ NUEVO

import SobreNosotrosPage from "./pages/SobreNosotrosPage"
import ConsultoriosPage from "./pages/ConsultoriosPage"

function App() {
  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        {/* PÁGINA PRINCIPAL */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SobreNosotros />
              <Informacion />
              <Atencion24 />   
              <Contacto />
            </>
          }
        />

        {/* PÁGINA SOBRE NOSOTROS */}
        <Route
          path="/sobre-nosotros"
          element={<SobreNosotrosPage />}
        />

        {/* PÁGINA CONSULTORIOS EXTERNOS */}
        <Route
          path="/consultorios"
          element={<ConsultoriosPage />}
        />
      </Routes>

      <Footer />

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <WhatsAppButton />
    </>
  )
}

export default App







