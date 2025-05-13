import client from "../database/db.js"

export default function insertQuestion(table, question, answer, questionurl, answerurl){
    return  new Promise((resolve,reject)=>{
        const insert = `INSERT INTO ${table} (question,answer,questionurl,answerurl) VALUES ($1, $2,$3, $4)`;
        const values =[question, answer, questionurl, answerurl];
        client.query(insert,values,(err, result)=>{
            if(err){
                console.error("error in inserting data",err);
                reject("Error in inserting data");
            }else{
               resolve("Question Added successfully");
            }
        });
    })
}



// res.status(200).json({message:"Question Added successfully", success:true}); 