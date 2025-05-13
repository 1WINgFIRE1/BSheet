import {useContext,useState,useEffect} from 'react'
import { ThemeContext } from '../context/themeContext.jsx'
import monkey from "../assets/monkey.png"
import styles from "../components/questionArea.module.css"

export default function Hero(){
  const theme = useContext(ThemeContext)
  const [themeMode, setThemeMode] = useState(theme.theme)
  useEffect(()=>{
      setThemeMode(theme.theme)
  },[theme])

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there 👋</h1>
          <div className="card bg-base-100 shadow-sm" style={{height:"30rem"}}>
            <figure className="px-10 pt-10">
              <img
                src={monkey}
                alt="Shoes"
                className="rounded-xl" 
                style={{height:"15rem"}}/>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className={`card-title ${themeMode === "dark" ? null : styles.black_font}`}>Welcome to Bittu Sheet!</h2>
              <p className={themeMode=== "dark" ? null: styles.black_font}>Don't focus on monkey, focus on life instead! Solve any GS, Reasoning or English question for people who wants sarkari naukri!</p>
              <div className="card-actions">
                <a href="/"><button className="btn btn-primary">See Navbar for Topics</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

