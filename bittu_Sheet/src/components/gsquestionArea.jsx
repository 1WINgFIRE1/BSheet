import React, { useEffect, useState } from 'react'
import styles from "./questionArea.module.css"
import axios from "axios"
import { Accrodian } from '../utils/accrodian';
export default function GsquestionArea(){
  // array of objects with questions and answers and primary key integer as id
  const [questions, setQuestions] = useState([])
  useEffect(()=>{
      async function fetchData(){
          const response = await axios.get("https://bsheet.onrender.com/api/fetchquestion",{params: {topic:"gstable"}})
          setQuestions(response.data)
      }
      fetchData()
  },[])
  return (
    <div className={styles.container}>
        <h1 className="text-2xl font-bold text-center pb-4">General Studies Questions</h1>
        {questions.reverse().map(question=>{
          return <Accrodian key={question.id} question={question}/>
        })}
    </div>
  )
}
