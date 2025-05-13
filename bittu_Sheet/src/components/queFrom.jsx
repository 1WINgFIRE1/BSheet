import React, { useState, useEffect } from 'react'
import styles from "./queForm.module.css"
import axios from "axios"
import { useContext } from "react";
import { ThemeContext } from '../context/themeContext.jsx';
export default function QueFrom() {
    const[que, setQue] = useState("");
    const[ans, setAns] = useState("");
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const questionSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        setLoading(true)
        const res = await axios.post("http://localhost:5000/question",formData,
            {headers: { "Content-Type": "multipart/form-data" }
        });
        setLoading(false)
        setToast(res.data)
        setTimeout(() => {
            setToast(null)
        }, 3000);
        setQue("");
        setAns("");       
    }
    // fetching the old theme from local storage
    const theme = useContext(ThemeContext)
    const [themeMode, setThemeMode] = useState(theme.theme)
    useEffect(()=>{
        setThemeMode(theme.theme)
    },[theme])

    return ( 
        <div className={styles.container}>
            {toast ? <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>{toast}</span>
                </div>
                </div>: null
            }
            <h1 className={`${styles.title} ${themeMode === "dark" ? styles.whiteFont: null}`}>Question Form</h1>
            <form onSubmit={questionSubmit} className={`${styles.form} ${themeMode === "dark" ? styles.darkForm : styles.lightForm}`}>
                <div className={styles.formGroup}>
                    <label htmlFor="Question" className={`${styles.label} ${themeMode === "dark" ? styles.whiteFont: null}`}>Question</label>
                    <textarea 
                    type="text" 
                    id="Question" 
                    name="question" 
                    value={que}
                    onChange={(e)=>setQue(e.target.value)}
                    className="textarea textarea-info"
                    placeholder="Enter your Question" 
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="QuestionImg" className={`${styles.label} ${themeMode === "dark" ? styles.whiteFont: null}`}>Uplaod your question (one image per qustion)*</label>
                    <input 
                    type="file" 
                    id="QuestionImg" 
                    name="questionImg" 
                    className="file-input file-input-primary"
                    placeholder="Upload your Question" 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="Answer" className={`${styles.label} ${themeMode === "dark" ? styles.whiteFont: null}`}>Answer</label>
                    <textarea
                    className="textarea textarea-info"
                    type="textarea" 
                    id="Answer" 
                    name="answer" 
                    value={ans}
                    onChange={(e)=>setAns(e.target.value)}
                    placeholder="Enter your Answer" 
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="QuestionImg" className={`${styles.label} ${themeMode === "dark" ? styles.whiteFont: null}`}>Uplaod your answer (one image per answer)*</label>
                    <input 
                    type="file" 
                    id="AnswerImg" 
                    name="answerImg" 
                    className="file-input file-input-primary"
                    placeholder="Upload your answer" 
                    />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="topic" className={`${styles.label} ${themeMode === "dark" ? styles.whiteFont: null}`}>Choose a Topic!</label>
                <select name="select_topic" id="topic" defaultValue="Pick a text editor" className="select select-primary" required>
                    <option disabled={true}>Pick a Topic</option>
                    <option value="gs">GS</option>
                    <option value="reasoning">Reasoning</option>
                    <option value="english">English</option>
                </select>
                </div>
                <button type="submit" className={styles.button}>{loading ? <span className="loading loading-spinner text-primary"></span>:"Submit"}</button>
            </form>
        </div> 
    )
}
