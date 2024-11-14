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

const displayToast = (status, message) => {
    Swal.fire({
        toast: true,
        position: 'bottom',
        icon: status, 
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
}






form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const users =  await getUsers()

    const indexOfUser = users.findIndex(user => user.email == email.value)

    if(indexOfUser != -1){
        const userPassword = users[indexOfUser].address.geo.lat
        if(password.value == userPassword){
            displayToast("success", "iniciaste sesion correctamente!")

            setTimeout(() => {
                window.location.href = "pages/main.html"
            },2000)
        }else{
            displayToast("error", "la contraseña ingresada es incorrecta")
        }
    }else{
        displayToast("error", "el mail ingresado no existe en nuestra base de datos")
    }
        
        
})




