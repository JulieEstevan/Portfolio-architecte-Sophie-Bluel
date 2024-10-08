
const token = localStorage.getItem("token")
const worksGallery = document.querySelector(".gallery")
const filtersContainer = document.querySelector(".filters")
const editHeader = document.querySelector(".header-edit")

export const fetchWorks = async () => {
    const responseWorks = await fetch("https://portfolio-architecte-sophie-bluel-ci1l.onrender.com/api/works")
    const works = responseWorks.json()
    return works
}
export const works = await fetchWorks()

const fetchCategories = async () => {
    const responseCategories = await fetch("https://portfolio-architecte-sophie-bluel-ci1l.onrender.com/api/categories")
    const categories = responseCategories.json()
    return categories
}
export const categories = await fetchCategories()

export const displayWorks = (worksToDisplay) => {
    worksToDisplay.forEach(work => {
        const workContainer = document.createElement("figure")
        const workImage = document.createElement("img")
        workImage.src = work.imageUrl
        const workTitle = document.createElement("figcaption")
        workTitle.innerHTML = work.title
        worksGallery.appendChild(workContainer)
        workContainer.append(workImage, workTitle)
    });
}
displayWorks(works)

const categoriesFilters = () => {
    const buttonFilterDefault = document.createElement("button")
    buttonFilterDefault.classList.add("button", "button-active")
    buttonFilterDefault.innerHTML = "Tous"
    buttonFilterDefault.value = 0
    filtersContainer.appendChild(buttonFilterDefault)

    categories.forEach(category => {
        const buttonFilter = document.createElement("button")
        buttonFilter.classList.add("button")
        buttonFilter.innerHTML = category.name
        buttonFilter.value = category.id
        filtersContainer.appendChild(buttonFilter)
    })
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const buttonActive = document.querySelector(".button-active")
            buttonActive.classList.remove("button-active")
            worksGallery.innerHTML = ""
            button.classList.add("button-active")
            if (+button.value === 0) {
                displayWorks(works)
            } else {
                const filterWorks = works.filter((work) => {
                    return work.categoryId === +button.value
                })
                displayWorks(filterWorks)
            }
        })
    })
}
import { displayModal } from "./modal.js"
const editMod = () => {
    editHeader.classList.add("header-edit-active")
    editHeader.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>'
    const logout = document.querySelector(".logout")
    logout.innerHTML = "logout"
    logout.href = "#" 
    logout.addEventListener("click", () => {
        localStorage.clear()
        window.location.href = "./index.html"
    })
    worksGallery.classList.add("gallery-edit")
}

if (token) {
    editMod()
    displayModal()
} else {
    categoriesFilters()
}