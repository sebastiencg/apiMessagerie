let newCompte= document.querySelector('#boutonNewCompte')
let messagerie= document.querySelector('#boutonMessagerie')
let connection= document.querySelector('#boutonConnection')
let inputPost=document.querySelector('#inputPost')
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
    printMessageries()
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
    <input class="input password" placeholder="Password" type="password"> 
    <button class="btn" id="seConnecter">Submit</button>
</div>
    `
    body.innerHTML=template
    inputPost.innerHTML=""
    //-------------------------------------
    let username=document.querySelector('.username')
    let password=document.querySelector('.password')
    let seConnecter=document.querySelector('#seConnecter')
    seConnecter.addEventListener('click',()=>{

        let url="https://droppingstuff.imatrythis.tk/b1devweb/api/login_check"

        let data = {
            username : username.value,
            password : password.value
        }

        let elementSerialise = JSON.stringify(data)

        let fetchParametre = {
            headers:{"Content-Type":"application/json"},
            method : "POST",
            body: elementSerialise
        }

        fetch(url,fetchParametre)
            .then((donnees)=>(donnees.json()))
            .then(donnee=>{
                console.log(donnee.token)
                token=donnee.token
                if (token){
                    alert("bienvenu")
                }
                else {
                    alert("erreur recommencer ou creer un nouveau compte")
                }
            })
    })
}
function printNewCompte(){
    let template=`
<br>
<div class="form">
    <p class="heading">nouveau compte</p>
    <input class="input username" placeholder="Username" type="text">
    <input class="input password" placeholder="Password"  type="password"> 
    <button class="btn" id="newCompte">Submit</button>
</div>
    `
    body.innerHTML=template
    inputPost.innerHTML=""
    //----------------------------------
    let username=document.querySelector('.username')
    let password=document.querySelector('.password')
    let newCompte=document.querySelector('#newCompte')
    newCompte.addEventListener('click',()=>{

        let url="https://droppingstuff.imatrythis.tk/b1devweb/api/registeruser"

        let data = {
            username : username.value,
            password : password.value
        }

        let elementSerialise = JSON.stringify(data)

        let fetchParametre = {
            method : "POST",
            body: elementSerialise

        }
        fetch(url,fetchParametre)
            .then((donnees)=>(donnees.json()))
            .then(donnee=>{
                console.log(donnee)
            })

    })


}
function printMessageries(){
    body.innerHTML=""
    connection.classList.remove("arriere")
    newCompte.classList.remove("arriere")
    messagerie.classList.add("arriere")
    let template=`
    <div class="mb-3">
  <label for="newPost" class="form-label">Example textarea</label>
  <textarea class="form-control" id="newPost" rows="3"></textarea>
<button class="btn btn-secondary" id="send">envoyer</button>
</div>

    `
    inputPost.innerHTML=template
    //----------------creation new post-----------------------

    let send=document.querySelector('#send')

    let newPost=document.querySelector('#newPost')

    send.addEventListener('click',()=>{

        let url="https://droppingstuff.imatrythis.tk/b1devweb/api/post"

        let data = {
            content : newPost.value,
        }

        let elementSerialise = JSON.stringify(data)

        let fetchParametre = {
            headers:{"Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            method : "POST",
            body: elementSerialise

        }

        fetch(url,fetchParametre)
            .then((donnees)=>(donnees.json()))
            .then(donnee=>{
                console.log(donnee)
            })

    })
    //--------------- fetch afficher les posts------------

    let url="https://droppingstuff.imatrythis.tk/b1devweb/api/posts"

    let fetchParametre = {
        headers:{"Content-Type": "application/json"},
        method : "GET"
    }

    fetch(url,fetchParametre)
        .then((donnees) => (donnees.json()))
        .then(donnee => {
            let posts = donnee['hydra:member']
            posts.forEach(post=>{
                template=` 
         <div class="position-relative m-4 bg-primary-subtle">
            <h4> auteur : ${post['user'].username}</h4>
            <p>${post.content}</p>
            <input type="hidden" value="${post.id}" id="postId">
            <button  class="btn btn-danger " id="delete">supprimer</button>
        </div>
        `

                body.innerHTML+=template;                })


            //-------------delete-----------------
            let supprimer =document.querySelector('#delete')
            let postId= document.querySelector('#postId')

            supprimer.addEventListener('click',()=>{

                let url=`https://droppingstuff.imatrythis.tk/b1devweb/api/posts/${postId.value}`



                let fetchParametre = {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    method : "DELETE",
                }

                fetch(url,fetchParametre)
                    .then((donnees)=>(donnees.json()))
                    .then(donnee=>{
                        console.log(donnee)
                    })
                console.log(postId.value)
            })
        })

}

