const token = localStorage.getItem("token")
const body = document.querySelector("body")
const worksGallery = document.querySelector(".gallery")
const filtersContainer = document.querySelector(".filters")
const editHeader = document.querySelector(".header-edit")
const modal = document.querySelector("dialog")

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
    modal.innerHTML = ""

    const modalBoxDelet = document.createElement("div")
    modalBoxDelet.classList.add("modal-box")
    modal.appendChild(modalBoxDelet)

    const modalCloseButton = document.createElement("button")
    modalCloseButton.classList.add("close-button")

    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Gallerie Photo"

    const modalGallery = document.createElement("div")
    modalGallery.classList.add("modal-gallery")
    works.forEach(work => {
        const modalImgContainer = document.createElement("div")
        const buttonDelet = document.createElement("button")
        buttonDelet.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>'
        buttonDelet.classList.add("button-delet")
        const modalImg = document.createElement("img")
        modalImg.src = work.imageUrl
        modalImg.classList.add("modal-img")
        modalImgContainer.append(buttonDelet, modalImg)
        modalGallery.appendChild(modalImgContainer)
    })

    const modalChangeButton = document.createElement("button")
    modalChangeButton.classList.add("modal-change-button")
    modalChangeButton.innerHTML = "Ajouter une Photo"

    modalBoxDelet.append(modalCloseButton, modalTitle, modalGallery, modalChangeButton)

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })

    modalChangeButton.addEventListener("click", () => {
        modalEditAdd()
        modalBoxDelet.remove()
    })
}

const modalEditAdd = () => {
    modal.innerHTML = ""

    const modalBoxAdd = document.createElement("div")
    modalBoxAdd.classList.add("modal-box")
    modal.appendChild(modalBoxAdd)

    const arrowBack = document.createElement("button")
    arrowBack.classList.add("arrow-back")
    arrowBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl"></i>'
    
    const modalCloseButton = document.createElement("button")
    modalCloseButton.classList.add("close-button")

    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Ajout photo"

    const modalFormAdd = document.createElement("form")
    modalFormAdd.classList.add("modal-form-add")

    const modalImgAddContainer = document.createElement("div")
    modalImgAddContainer.classList.add("modal-img-add-container")
    const modalImgAddButton = document.createElement("label")
    modalImgAddButton.classList.add("img-add-button")
    modalImgAddButton.setAttribute("for", "image-add")
    modalImgAddButton.innerHTML = "+ Ajouter photo"
    const modalImgAdd = document.createElement("input")
    modalImgAdd.type = "file"
    modalImgAdd.name = "image-add"
    modalImgAdd.id = "image-add"
    modalImgAdd.accept = ".jpg,.png"
    modalImgAdd.style = "display:none"
    const modalImgRequirements = document.createElement("p")
    modalImgRequirements.innerHTML = "jpg, png : 4mo max"
    modalImgAddContainer.append(modalImgAddButton, modalImgAdd, modalImgRequirements)
    

    const modalNameAddLabel = document.createElement("label")
    modalNameAddLabel.setAttribute("for", "name")
    modalNameAddLabel.innerHTML = "Titre"
    const modalNameAdd = document.createElement("input")
    modalNameAdd.type = "text"
    modalNameAdd.name = "name"
    modalNameAdd.id = "name"

    const modalCategorySelectorLabel = document.createElement("label")
    modalCategorySelectorLabel.innerHTML = "Catégorie"
    const modalCategorySelectorContainer = document.createElement("label")
    modalCategorySelectorContainer.setAttribute("for", "category-select")
    modalCategorySelectorContainer.classList.add("modal-selector")
    
    const modalCategorySelector = document.createElement("select")
    modalCategorySelector.name = "categories"
    modalCategorySelector.id = "category-select"
    modalCategorySelectorContainer.appendChild(modalCategorySelector)
    const categorySelectorOptionDefault = document.createElement("option")
    categorySelectorOptionDefault.innerHTML = ""
    modalCategorySelector.append(categorySelectorOptionDefault)
    categories.forEach(category => {
        const categorySelectorOption = document.createElement("option")
        categorySelectorOption.innerHTML = category.name
        modalCategorySelector.appendChild(categorySelectorOption)
    })

    const modalValidateButton = document.createElement("button")
    modalValidateButton.classList.add("modal-validate-button")
    modalValidateButton.innerHTML = "Valider"
    modalValidateButton.disabled = true

    modalBoxAdd.append(arrowBack, modalCloseButton, modalTitle, modalFormAdd, modalValidateButton)
    modalFormAdd.append(modalImgAddContainer, modalNameAddLabel, modalNameAdd, modalCategorySelectorLabel, modalCategorySelectorContainer)

    arrowBack.addEventListener("click", () => {
        modalEditDelet()
        modalBoxAdd.remove()
    })

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })
}

const displayModal = () => {
    const editButton = document.querySelector(".edit")
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'

    editButton.addEventListener("click", () => {
        modalEditDelet()
        modal.showModal()
    })
}

if (token) {
    editMod()
    displayModal()
} else {
    categoriesFilters()
}