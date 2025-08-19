const signupform=document.querySelector("#signup")
const email=document.querySelector("#email")
const password=document.querySelector("#password")

function addUser(email,password){
    let newUser={
        email:email,
        password:password
    }
    fetch("/addUser",{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "content-type":"application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data)
        if(data.success){
            alert(data.message)
            signupform.reset()
        }else{
            alert(data.error)
            signupform.reset()
        }
    }).catch((err)=>{
        console.log(err);
    })
}

signupform.addEventListener("submit",function(e){
    e.preventDefault();
    addUser(email.value,password.value)
})