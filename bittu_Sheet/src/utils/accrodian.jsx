import { useState } from "react";
import styles from "./accrodian.module.css"
export const Accrodian = ({question}) => {
    const [active, setActive] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [zoomImg, setZoomImg] = useState(null)
    function handleToggle(){
        setActive(prev=>!prev)
    }
  
    function handleZoom(e){
      //to prevent event bubbling to the parent div
      e.stopPropagation();
      setZoom(prev=>!prev)
      setZoomImg(e.target.src)
    }
  return (
    <div key={question.id} className={`${zoom ? `${styles.mark_zoom_div}`:""} collapse ${active ? `collapse-open bg-info`: `collapse-close bg-secondary`} collapse-arrow bg-base-100 border border-base-300`} >
        <div onClick={handleToggle} className="collapse-title font-semibold ">
        {question.questionurl ? <img onClick={handleZoom} src={question.questionurl} alt="question image" className={styles.originalImg} /> :undefined}
          <span>Q{question.id}) {question.question}</span>
        </div>
        <div className="collapse-content text-sm">
        {question.answerurl ? <img onClick={handleZoom} src={question.answerurl} alt="answer image" className={styles.originalImg} />: undefined}
          <span style={{marginTop:"2rem"}}>{question.answer}</span></div>
        {zoom ? <div
            className={styles.zoomed_image_container}
            onClick={() => setZoom(false)}
          > 
          <img
            src={zoomImg}
            alt="Zoomed"
            className={styles.zoomed_img}
          />
          </div>: null
        }
    </div>
  )
}
