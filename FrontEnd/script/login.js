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
        .then((reponse) => reponse.json())
        .then(login => {
            if (login.token) {
                localStorage.setItem("token", login.token)
                window.location.href = "./index.html"
            } else {
                console.error("Le token n'a pas été trouvé")
                errorDisplay.innerHTML = "Identifiant ou mot de passe incorrect"
            }
        })
})

inputEmail.addEventListener("input", (event) => {
    console.log(event.target.value)
})
inputPassword.addEventListener("input", (event) => {
    console.log(event.target.value)
})