const express = require("express");
const app = express();
PORT=4000;
const fs = require("fs");
const path= require("path")
let users=fs.readFileSync("./database/user.json", "utf-8").trim() || [];
users = JSON.parse(users);

app.use(express.json());


app.post("/login", (req,res) => {
    
    console.log(req.body);
    req.body.id=users.length>0 ? users[users.length-1].id +1 : 1;
    const user_email=req.body.email;
    const user_password=req.body.password;
    const db_password=getPassword(user_email);

    if(user_password==db_password && db_password != null){
        res.status(200).json({
            message:"Login successfull",
            status:200
        })
    }else{
        res.status(403).json({
            message:"Login unsuccessfull",
            status:403
        });
     }
    });

function getPassword(user_email) {
   for (let index = 0; index < users.length; index++) {
    const user = users[index]; 
    const email = user.email;
    const password = user.password;

    if (user_email == email) {
        return password;
    }
}   
}


app.post("/signup", (req,res) => {
    
    
    req.body.id=users.length>0 ? users[users.length-1].id +1 : 1;
    console.log(typeof users);
    users.push(req.body);



    fs.writeFileSync("./database/user.json", JSON.stringify(users,null,2));    
    
    res.status(201).json({
    message:"new user created",
    status:201
})
});



app.listen(PORT, ()=>console.log("Server is running on http://localhost:"+PORT))