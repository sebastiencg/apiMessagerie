let newCompte= document.querySelector('#boutonNewCompte')
let messagerie= document.querySelector('#boutonMessagerie')
let connection= document.querySelector('#boutonConnection')
let body= document.querySelector('#body')
let token= null;

newCompte.addEventListener('click',()=>{
    newCompte.classList.add("arriere")
    messagerie.classList.remove("arriere")
    connection.classList.remove("arriere")
    printNewCompte()

})
messagerie.addEventListener('click',()=>{
    messagerie.classList.add("arriere")
    newCompte.classList.remove("arriere")
    connection.classList.remove("arriere")
    printMessagerie()
})
connection.addEventListener('click',()=>{
    connection.classList.add("arriere")
    newCompte.classList.remove("arriere")
    messagerie.classList.remove("arriere")

    printConnection()
})
//------------------------------------------------------
function printConnection(){
    let template=`
<br>
<div class="form">
    <p class="heading">se connecter</p>
    <input class="input username" placeholder="Username" type="text">
    <input class="input password" placeholder="Password" type="text"> 
    <button class="btn" id="seConnecter">Submit</button>
</div>
    `
    body.innerHTML=template
    //-------------------------------------
    let username=document.querySelector('.username')
    let password=document.querySelector('.password')
    let seConnecter=document.querySelector('#seConnecter')
    seConnecter.addEventListener('click',()=>{
        alert(username.value);
        alert(password.value);
    })
}
function printNewCompte(){
    let template=`
<br>
<div class="form">
    <p class="heading">nouveau compte</p>
    <input class="input username" placeholder="Username" type="text">
    <input class="input password" placeholder="Password" type="text"> 
    <button class="btn" id="newCompte">Submit</button>
</div>
    `
    body.innerHTML=template
    //----------------------------------
    let username=document.querySelector('.username')
    let password=document.querySelector('.password')
    let newCompte=document.querySelector('#newCompte')
    newCompte.addEventListener('click',()=>{
        alert(username.value);
        alert(password.value);
    })
}
function printMessagerie(){
    if(!token){
        alert("connecte toi ou crée un compte ")
        connection.classList.add("arriere")
        newCompte.classList.remove("arriere")
        messagerie.classList.remove("arriere")
    }
}

