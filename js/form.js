const API = "https://jsonplaceholder.typicode.com/users";
const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.getElementById("form")




const getUsers = async() => {
    const response = await fetch(API)
    if(response.ok){
        const data = await response.json()
        console.log(data)
        return data
    }else{
        return []
    }
}





form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const users =  await getUsers()

    const indexOfUser = users.findIndex(user => user.email == email.value)

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




