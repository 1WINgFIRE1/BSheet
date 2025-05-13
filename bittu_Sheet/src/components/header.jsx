import React, { useEffect, useState } from 'react'
import styles from './header.module.css';
import {useContext} from "react";
import { ThemeContext } from '../context/themeContext.jsx';
export default function Header() {
    // fetching the old theme from local storage
    const LocalTheme = localStorage.getItem("theme");
    let themeFlag=true
    if(LocalTheme === "dark"){
        themeFlag=false
    }
    const {theme, setTheme} = useContext(ThemeContext)
    const [lightTheme, setLightTheme] = useState(themeFlag);
    useEffect(()=>{
        setTheme(themeFlag ? "cupcake" : "dark")
    },[])
    // function to change the theme of the website on button click
    const handleThemeChangeClick=()=>{
        if(document.documentElement.getAttribute("data-theme")==="cupcake"){
            document.documentElement.setAttribute("data-theme","dark");
            localStorage.setItem("theme","dark")
            setLightTheme(false);
            setTheme("dark")
        }else{  
            document.documentElement.setAttribute("data-theme","cupcake");
            localStorage.setItem("theme","cupcake")
            setLightTheme(true);
            setTheme("cupcake")
        }
    };
    
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href='/' >Home</a></li>
            <li><a href='/queform' >Form</a></li>
            <li><a href='/gs' >GS</a></li>
            <li><a href='/reasoning' >Reasoning</a></li>
            <li><a href='/english' >English</a></li>
        </ul>
        </div>
        <a className="btn btn-ghost text-xl" href='/'>Bittu Sheet</a>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><a href='/' >Home</a></li>
        <li><a href='/queform' >Form</a></li>
        <li><a href='/gs' >GS</a></li>
        <li><a href='/reasoning' >Reasoning</a></li>
        <li><a href='/english' >English</a></li>
        </ul>
    </div>
    <div className="navbar-end">
        <button className={styles.btn} onClick={()=>handleThemeChangeClick()}>{lightTheme ? <span>🌚</span>:<span>😎</span>}</button>
    </div>
    </div>
  )
}
