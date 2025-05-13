import "./App.css"
import QueFrom from './components/queFrom.jsx'
import Hero from './components/Hero.jsx'
import GsquestionArea from './components/gsquestionArea.jsx'
import ReasoningquestionArea from './components/reasoningquestionArea.jsx'
import EnglishquestionArea from './components/englishquestionArea.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import {Routes, Route} from "react-router-dom"
import ThemeFunction from "./context/themeContext.jsx"
function App() {

  return (
    <div className="app-container">
      <ThemeFunction>
        <Header/>
        <main className="app-main">
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/queform" element={<QueFrom/>} />
          <Route path="/gs" element={<GsquestionArea/>} />
          <Route path="/reasoning" element={<ReasoningquestionArea/>} />
          <Route path="/english" element={<EnglishquestionArea/>} />
        </Routes>
        </main>
        <Footer/>
      </ThemeFunction> 
    </div>
  )
}

export default App
