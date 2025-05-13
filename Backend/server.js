import express from "express";
import cors from "cors"
import client from "./database/db.js";
// multer will now handling the urlendcoding as it can also handle multipart form data as well as json data 
import multer from "multer";
import uploadImageToCloudinary from "./cloudinary/cloudinaryUploadFunction.js";
import insertQuestion from "./database/insertionFunction.js";

const app=express();

// app.use(express.json());
app.use(cors({
    origin:"*"
}))

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/question",upload.fields([{name:"questionImg",maxCount:1},{name:"answerImg", maxCount:1}]),async(req,res)=>{
    const {question, answer, select_topic}=req.body;

    // check whether question has Images or not
    const questionImg = req.files.questionImg ? req.files.questionImg[0] : null;
    const answerImg = req.files.answerImg ? req.files.answerImg[0] : null;

    
    // variable to store the url of the image
    // this is because we need to store the url of the image in the database
    let questionurl = null;
    let answerurl = null;


    try{
        //we wait until the image is uploaded to cloudinary and then we get the url of the image
        //this is neccesary because we need to store the url of the image in the database
        if(questionImg!==null){
            questionurl=await uploadImageToCloudinary(questionImg)
        }
        if(answerImg!==null){
            answerurl=await uploadImageToCloudinary(answerImg)
        }

        // inserting into the databse
        let response = null;;
        if(select_topic==="gs"){
            response = await insertQuestion("gstable", question, answer, questionurl, answerurl);
        }else if(select_topic==="reasoning"){
            response = await insertQuestion("reasoningtable", question, answer, questionurl, answerurl);
        }else if(select_topic==="english"){
            response = await insertQuestion("englishtable", question, answer, questionurl, answerurl);
        }else{
            res.status(400).json({error:"Please select a topic"});
        }

        // if everything is fine then send the response to the client
        res.status(200).json(response);

     }catch(err){
        res.status(500).json({error:"Error connecting to the database"});
    }
})

app.get("/api/fetchquestion",async(req,res)=>{
    const table = req.query.topic;
    try{
        // to fetch all questions from database of a particular topic
        const query = `SELECT * FROM ${table}`;
        const result = await client.query(query);
        res.status(200).json(result.rows);

    }catch(err){
        res.status(500).json({error:"Error connecting to the database"});
    }
    
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});