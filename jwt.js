const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const secretKey="secretKey";

app.use(express.json())

app.listen(3202,()=>{
    console.log("server running");
})


const verifyToken=(req,res,next)=>{

    const headers = req.headers['authorization'];
if(typeof headers !=="undefined"){
   const  bearer = headers.split(" ");
   const token=bearer[1];
   req.token=token;
   next()
}else{
   res.send("error middleware verifytoken")
}
}


app.post("/",(req,res)=>{
    const {username,password} = req.body;

    jwt.sign({username,password},secretKey,(error,token)=>{

        if(error){
            return res.send("token generation error");
        }else{
            res.json(token)
        }        
    })
})


app.get("/access",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,data)=>{

        console.log(data, req.body);

        if(err){
            res.send("error profile accessed")
        }else{
            res.json({
                message:"profiled",
                data, 
            })
        }
    })
})