import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero" // <--- Імпорт
import About from "./components/About/About"
import Portfolio from "./components/Portfolio/Portfolio"
import Contact from "./components/Contact/Contact"
import Services from "./components/Services/Services"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {/* Далі тут будуть інші блоки */}
        <Services />
        <Portfolio />
        <Contact />
        
      </main>
      <Footer />
    </>
  )
}

export default App