const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.post("/user", (req, res) => {
    try{
        let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    res.json({ 
        success: true,
        message: "User added successfully",
        data:{
            email,
            password
        } 
        })
    }
    catch(err){
        res.json({
            success: false,
            message:err.message
        })
    }

});

app.listen(4556,()=>{
    console.log("Server started");
})