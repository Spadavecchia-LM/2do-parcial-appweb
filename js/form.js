const API = "https://jsonplaceholder.typicode.com/users";
const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.getElementById("form")


let users = []

const getUsers = async() => {
    const response = await fetch(API)
    if(response.ok){
        const data = await response.json()
        users = data
        console.log(users)
    }
}

getUsers()



form.addEventListener("submit", (event) => {
    event.preventDefault()

    const indexOfUser = users.findIndex(element => element.email == email.value)

    if(indexOfUser != -1){
        const userPassword = users[indexOfUser].address.geo.lat
        if(password.value == userPassword){
            alert("iniciaste sesion correctamente")
        }else{
            alert("la contraseña ingresa no es la correcta")
        }
    }else{
        alert("el email ingresado no figura en nuestra base de datos")
    }
        

  
        
})




