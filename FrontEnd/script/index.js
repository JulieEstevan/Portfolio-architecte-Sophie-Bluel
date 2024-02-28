const token = localStorage.getItem("token")
const body = document.querySelector("body")
const worksGallery = document.querySelector(".gallery")
const filtersContainer = document.querySelector(".filters")
const editHeader = document.querySelector(".header-edit")
const modal = document.querySelector("dialog")
const modalCloseButton = document.querySelector(".close-button")
const modalGallery = document.querySelector(".modal-gallery")
const modalAddButton = document.querySelector(".modal-button-add")

const fetchWorks = async () => {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    const works = responseWorks.json()
    return works
}
const works = await fetchWorks()

const fetchCategories = async () => {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = responseCategories.json()
    return categories
}
const categories = await fetchCategories()

const displayWorks = (worksToDisplay) => {
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

const modalEditDelet = () => {
    modalGallery.innerHTML = ""
    works.forEach(work => {
        const modalImg = document.createElement("img")
        modalImg.src = work.imageUrl
        modalImg.classList.add("modal-img")
        modalGallery.appendChild(modalImg)
    })
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })
    modal.showModal()
}

const modalEditAdd = () => {

}

const displayModal = () => {
    const editButton = document.querySelector(".edit")
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'

    editButton.addEventListener("click", () => {
        modalEditDelet()
    })

    modalAddButton.addEventListener("click", () => {
        console.log("bravo")
        modalEditAdd()
    })
}

if (token) {
    editMod()
    displayModal()
} else {
    categoriesFilters()
}