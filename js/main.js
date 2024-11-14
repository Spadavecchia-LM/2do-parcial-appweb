const ctx = document.getElementById('myChart');
const API_GENDER = "https://api.genderize.io/?name="
const API_NATION = "https://api.nationalize.io/?name="
const form = document.getElementById("form2")
const genderContainer = document.getElementById("genderContainer")
const nationalityContainer = document.getElementById("nationalityContainer")
const button = document.getElementById("logoutBtn")

const getGender = async (name) => {
    const response = await fetch(`${API_GENDER}${name}`)

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return []
    }
}
const getNationality = async (name) => {
    const response = await fetch(`${API_NATION}${name}`)
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return []
    }
}




form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const name = document.getElementById("nombre").value

    const gender = await getGender(name)
    const nationality = await getNationality(name);

    console.log(gender)
    console.log(nationality)


    genderContainer.innerHTML = `
        <h1>${name.toUpperCase()}</h1>
        <h3>Genero: ${gender.gender == "male" ? "Masculino" : "Femenino"}</h3>
        <h3>Recuento: ${gender.count}</h3>
        <label for="probabilidad">Probabilidad de que sea ${gender.gender == "male" ? "masculino" : "Femenino"}:</label>
        <progress 
        id="probabilidad" 
        value=${gender.probability * 100} 
        max="100">
        </progress>
        <span>${gender.probability * 100}%</span>
        
    `

    nationalityContainer.innerHTML = nationality.country.map(country => `
            <div>
            <label for="probabilidad-${country.country_id}">
            País: ${country.country_id}
            <img
             src="https://flagpedia.net/data/flags/h80/${country.country_id.toLowerCase()}.png" 
             alt="Bandera de ${country.country_id}" 
             width="20" 
             height="15">
            </label>

            <progress 
            id="probabilidad-${country.country_id}" 
            value="${country.probability * 100}" 
            max="100">
            </progress>
            <span>${(country.probability * 100).toFixed(2)}%</span>
            </div>
    `).join('');




})

button.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

