const selectusuario= document.getElementById("select-usuario")
const muroDiv = document.getElementById("muro")
const avatar = document.getElementById("avatar")
const nombreHeader =document.getElementById("nombre-usuario")

//cargamos los usuarios en el select 
fetch('https://jsonplaceholder.typicode.com/users')
.then(response =>response.json())
.then(usuarios=>{
    usuarios.forEach(usuario=>{
        const opcion='<option value="'+usuario.id+'">'+usuario.name+'</option>'
        selectusuario.innerHTML+=opcion
    })
})


//que va a haecr cada que selecciona un usuario
const cargarMuro=()=>{
    const userId=selectusuario.value
    const nombre=selectusuario.options[selectusuario.selectedIndex].text

    //mosramos el nombre del usuario y su avatar
    nombreHeader.innerText=nombre
    avatar.src="https://api.dicebear.com/9.x/adventurer/svg?seed="+nombre
    avatar.style.display="block"

    //cargamos el muro
    fetch("https://jsonplaceholder.typicode.com/users/"+userId+"/posts")
    .then(response=>response.json())
    .catch(posts=>{
        muroDiv.innerHTML=""

        posts.forEach(post=>{
            
        })
    })
}