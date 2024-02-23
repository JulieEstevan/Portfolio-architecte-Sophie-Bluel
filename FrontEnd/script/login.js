const sendId = () => {
    return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": stockInputEmail,
            "password": stockInputPassword,
        })
    })
}

const inputEmail = document.querySelector('input[type="email"]')
const inputPassword = document.querySelector('input[type="password"]')
const submit = document.querySelector('input[type="submit"]')
const errorDisplay = document.querySelector(".error")
const login = document.getElementById("login")
let stockInputEmail = inputEmail.value
let stockInputPassword = inputPassword.value

submit.addEventListener("click", (event) => {
    event.preventDefault()
    stockInputEmail = inputEmail.value
    stockInputPassword = inputPassword.value
    sendId()
        .then(response => {
            console.log(response)
            if (response.status === 404) {
                console.log("passe")
                throw new Error("Identifiant incorrect")
            } else if (response.status === 401) {
                throw new Error("Mot de passe incorrect")
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            localStorage.setItem("token", data.token)
            window.location.href = "./index.html"
        })
        .catch((error) => {
            console.log(error)
            errorDisplay.innerHTML = error
        })
})

inputEmail.addEventListener("input", (event) => {
    console.log(event.target.value)
})
inputPassword.addEventListener("input", (event) => {
    console.log(event.target.value)
})