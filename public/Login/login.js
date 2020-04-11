let username = document.querySelector("#username");
let password = document.querySelector("#pw");

function createMessage(message, color){
    let error_msg = document.createElement("p")
    error_msg.id = "msg"
    error_msg.style.color = color
    error_msg.style.margin = "4px";
    let error_txt = document.createTextNode(message)
    error_msg.appendChild(error_txt)
    let parent = document.querySelector("#credentials")
    parent.insertBefore(error_msg, parent.firstChild)
}


function validateUser(){
    if (username.value === "cmsc127" && password.value === "127"){
        let error = document.querySelector("#msg");
        if (error){
            error.style.color = "#66BB6A"
            error.innerText = "Successfully logged in!"
        } else {
            createMessage("Successfully logged in!", "#66BB6A")
        }
    } else {
        if (!document.querySelector("#msg")){
            createMessage("Invalid credentials were entered", "#FF5252")
            // parent.appendChild(error_msg)
        }
    }
}

document.querySelector("#login").addEventListener("click", ()=>{
    // console.log(username_val + " " + password_val)
    // console.log(password.value)
    validateUser()

})

document.addEventListener("keypress", (key)=>{
    if(key.keyCode == 13){
        validateUser()
    }
})
