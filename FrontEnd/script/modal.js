import {works, categories} from "./index.js"
const modal = document.querySelector("dialog")
const modalCloseButton = document.createElement("button")
modalCloseButton.classList.add("close-button")
const modalChangeButton = document.createElement("button")
const arrowBack = document.createElement("button")

export const modalEditDelet = () => {
    modal.innerHTML = ""

    const modalBoxDelet = document.createElement("div")
    modalBoxDelet.classList.add("modal-box")
    modal.appendChild(modalBoxDelet)

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

    modalChangeButton.classList.add("modal-change-button")
    modalChangeButton.innerHTML = "Ajouter une Photo"

    modalBoxDelet.append(modalCloseButton, modalTitle, modalGallery, modalChangeButton)
}

export const modalEditAdd = () => {
    modal.innerHTML = ""

    const modalBoxAdd = document.createElement("div")
    modalBoxAdd.classList.add("modal-box")
    modal.appendChild(modalBoxAdd)

    arrowBack.classList.add("arrow-back")
    arrowBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl"></i>'

    const modalTitle = document.createElement("h3")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = "Ajout photo"

    const modalFormAdd = document.createElement("form")
    modalFormAdd.classList.add("modal-form-add")
    modalFormAdd.name = "modalFormAdd"

    const modalImgAddContainer = document.createElement("div")
    modalImgAddContainer.classList.add("modal-img-add-container", "modal-img-logo")
    const modalImgAddButton = document.createElement("label")
    modalImgAddButton.classList.add("img-add-button")
    modalImgAddButton.setAttribute("for", "image")
    modalImgAddButton.innerHTML = "+ Ajouter photo"
    const modalImgAdd = document.createElement("input")
    modalImgAdd.type = "file"
    modalImgAdd.name = "image"
    modalImgAdd.id = "image"
    modalImgAdd.accept = ".jpg,.png"
    modalImgAdd.style = "display:none"
    const modalImgRequirements = document.createElement("p")
    modalImgRequirements.innerHTML = "jpg, png : 4mo max"
    const modalImgPreview = document.createElement("img")
    modalImgPreview.classList.add("modal-img-preview")
    modalImgAddContainer.append(modalImgPreview, modalImgAddButton, modalImgAdd, modalImgRequirements)

    addEventListener("input", () => {
        if (modalImgAdd.files[0].size <= 4000000) {
        const modalImgAddFile = document.querySelector("input[type=file]").files[0]
        const modalImgReader = new FileReader()
        modalImgAddButton.classList.remove("img-add-button-error")
        modalImgReader.addEventListener("load", () => {
        modalImgPreview.src = modalImgReader.result
        })
        if (modalImgAddFile) {
            modalImgReader.readAsDataURL(modalImgAddFile)
            modalImgRequirements.remove()
            modalImgAddButton.style = "display:none"
            modalImgAddContainer.classList.remove("modal-img-logo")
            modalImgAddContainer.classList.replace("modal-img-add-container", "modal-img-add-container-preview")
        }
        console.log(modalImgAddFile.size)
        } else {
            console.log("Error : Fichier trop volumineux")
            modalImgAddButton.classList.add("img-add-button-error")
        }
    })
    const modalNameAddLabel = document.createElement("label")
    modalNameAddLabel.setAttribute("for", "title")
    modalNameAddLabel.innerHTML = "Titre"
    const modalNameAdd = document.createElement("input")
    modalNameAdd.type = "text"
    modalNameAdd.name = "title"
    modalNameAdd.id = "title"

    const modalCategorySelectorLabel = document.createElement("label")
    modalCategorySelectorLabel.innerHTML = "Catégorie"
    const modalCategorySelectorContainer = document.createElement("label")
    modalCategorySelectorContainer.setAttribute("for", "category")
    modalCategorySelectorContainer.classList.add("modal-selector")
    
    const modalCategorySelector = document.createElement("select")
    modalCategorySelector.name = "category"
    modalCategorySelector.id = "category"
    modalCategorySelectorContainer.appendChild(modalCategorySelector)
    const categorySelectorOptionDefault = document.createElement("option")
    categorySelectorOptionDefault.innerHTML = ""
    modalCategorySelector.append(categorySelectorOptionDefault)
    categories.forEach(category => {
        const categorySelectorOption = document.createElement("option")
        categorySelectorOption.innerHTML = category.name
        categorySelectorOption.id = category.id
        modalCategorySelector.appendChild(categorySelectorOption)
    })
    const modalValidateButton = document.createElement("button")
    modalValidateButton.classList.add("modal-validate-button")
    modalValidateButton.innerHTML = "Valider"
    modalValidateButton.disabled = true
    modalFormAdd.addEventListener("input", (event) => {
        if (modalCategorySelector.value !== "" && modalNameAdd.value !== "" && modalImgAdd.value !== "") {
            modalValidateButton.disabled = false
            modalValidateButton.classList.replace("modal-validate-button", "modal-validate-button-validate")
        } else {
            modalValidateButton.disabled = true
            modalValidateButton.classList.replace("modal-validate-button-validate", "modal-validate-button")
        }
    })

    modalBoxAdd.append(arrowBack, modalCloseButton, modalTitle, modalFormAdd, modalValidateButton)
    modalFormAdd.append(modalImgAddContainer, modalNameAddLabel, modalNameAdd, modalCategorySelectorLabel, modalCategorySelectorContainer)
}

export const displayModal = () => {
    const editButton = document.querySelector(".edit")
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>'

    editButton.addEventListener("click", () => {
        modalEditDelet()
        modal.showModal()
    })

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close()
        }  else if (event.target === modalCloseButton) {
            modal.close()
        }
    })

    modalChangeButton.addEventListener("click", () => {
        modalEditAdd()
    })

    arrowBack.addEventListener("click", () => {
        modalEditDelet()
    })
}